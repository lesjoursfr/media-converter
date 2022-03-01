import ffmpeg from 'fluent-ffmpeg';
import { EOL } from 'os';
import path from 'path';
import pc from 'picocolors';
import ProgressBar from 'progress';
import { EncoderOptions, ffmpegWithCodec } from './presets';

function log (message: string) {
  console.log(`${pc.magenta('[ffmpeg]')} ${message}`);
}

function createProgressBar (): ProgressBar {
  return new ProgressBar(
    `${pc.magenta('[ffmpeg]')} Processing : [${pc.gray(':bar')}] ${pc.magenta(':percent')} - ETA : ${pc.magenta(':etas')}`,
    {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: 100
    }
  );
}

export function encode (file: string, codec: string, options: EncoderOptions) {
  return new Promise((resolve, reject) => {
    const extname = path.extname(file);
    const destination = file.replace(new RegExp(`${extname}$`), `.${codec}`);
    let bar: ProgressBar;

    ffmpegWithCodec(ffmpeg(file), codec, options)
      .on('start', (commandLine) => {
        log(`Spawn with the command ${pc.gray(pc.italic(commandLine))}`);
      })
      .on('codecData', function (data) {
        if (data.video) {
          log('The input is a video file :' +
            pc.gray(`${EOL}\t- format : ${data.format}${EOL}\t- duration : ${data.duration}${EOL}\t- audio : ${data.audio_details}${EOL}\t- video : ${data.video_details}`));
        } else {
          log('The input is an audio file :' +
            pc.gray(`${EOL}\t- format : ${data.format}${EOL}\t- duration : ${data.duration}${EOL}\t- audio : ${data.audio_details}`));
        }
      })
      .on('progress', function (progress) {
        if (bar === undefined) {
          bar = createProgressBar();
        }

        bar.update(progress.percent / 100);
      })
      .on('error', function (err) {
        reject(err);
      })
      .on('end', function (stdout) {
        log(`${EOL}Conversion complete : ${pc.gray(destination)}`);
        resolve(stdout);
      })
      .save(file.replace(new RegExp(`${extname}$`), `.${codec}`));
  });
}
