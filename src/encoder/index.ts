import ffmpeg from "fluent-ffmpeg";
import { EOL } from "os";
import path from "path";
import pc from "picocolors";
import ProgressBar from "progress";
import { EncoderOptions, ffmpegWithCodec } from "./presets";

function log(message: string) {
  console.log(`${pc.magenta("[ffmpeg]")} ${message}`);
}

function createProgressBar(): ProgressBar {
  return new ProgressBar(
    `${pc.magenta("[ffmpeg]")} Processing : [${pc.gray(":bar")}] ${pc.magenta(":percent")} - ETA : ${pc.magenta(
      ":etas"
    )}`,
    {
      complete: "=",
      incomplete: " ",
      width: 20,
      total: 100,
    }
  );
}

type AudioCodecData = {
  format: string;
  duration: string;
  audio: string;
  audio_details: string;
};
type VideoCodecData = {
  format: string;
  duration: string;
  audio: string;
  audio_details: string;
  video: string;
  video_details: string;
};
type CodecData = AudioCodecData | VideoCodecData;

function isVideoCodecData(codecData: CodecData): codecData is VideoCodecData {
  return typeof (codecData as VideoCodecData).video === "string";
}

export function encode(file: string, codec: string, options: EncoderOptions) {
  return new Promise((resolve, reject) => {
    const extname = path.extname(file);
    const destination = file.replace(new RegExp(`${extname}$`), `.${codec}`);
    let bar: ProgressBar;

    ffmpegWithCodec(ffmpeg(file), codec, options)
      .on("start", (commandLine) => {
        log(`Spawn with the command ${pc.gray(pc.italic(commandLine))}`);
      })
      .on("codecData", function (data) {
        const codecData = data as CodecData; // Fix typings

        if (isVideoCodecData(codecData)) {
          log(
            "The input is a video file :" +
              pc.gray(
                `${EOL}\t- format : ${codecData.format}${EOL}\t- duration : ${codecData.duration}${EOL}\t- audio : ${codecData.audio_details}${EOL}\t- video : ${codecData.video_details}`
              )
          );
        } else {
          log(
            "The input is an audio file :" +
              pc.gray(
                `${EOL}\t- format : ${codecData.format}${EOL}\t- duration : ${codecData.duration}${EOL}\t- audio : ${codecData.audio_details}`
              )
          );
        }
      })
      .on("progress", function (progress) {
        if (bar === undefined) {
          bar = createProgressBar();
        }

        bar.update((progress.percent ?? 0) / 100);
      })
      .on("error", function (err) {
        reject(err);
      })
      .on("end", function (stdout) {
        log(`${EOL}Conversion complete : ${pc.gray(destination)}`);
        resolve(stdout);
      })
      .save(file.replace(new RegExp(`${extname}$`), `.${codec}`));
  });
}
