import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import ProgressBar from 'progress';
import { ffmpegWithCodec } from './presets';

export function encode (file: string, codec: string) {
  return new Promise((resolve, reject) => {
    const extname = path.extname(file);
    let bar : ProgressBar;

    ffmpegWithCodec(ffmpeg(file), codec)
      .on('start', (commandLine) => {
        console.log(`Spawned Ffmpeg with command: ${commandLine}`);
      })
      .on('codecData', function (data) {
        console.log(`Input is ${data.audio} audio with ${data.video} video`);
      })
      .on('progress', function (progress) {
        if (bar === undefined) {
          bar = new ProgressBar('Processing: [:bar] :percent - ETA: :etas', {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: 100
          });
        }

        bar.update(progress.percent / 100);
      })
      .on('error', function (err, stdout, stderr) {
        reject(err);
      })
      .on('end', function (stdout, stderr) {
        resolve(stdout);
      })
      .save(file.replace(new RegExp(`${extname}$`), `.${codec}`));
  });
}
