import { Arguments, Argv } from "yargs";
import { encode } from "../encoder";

type Options = {
  file: string;
  audiobitrate: number | undefined;
  videobitrate: number | undefined;
  resize: string | undefined;
};

export const command = "video <file>";
export const desc = "Convert the video file";

export const builder = (yargs: Argv): Argv => {
  return yargs
    .positional("file", {
      type: "string",
      demandOption: true,
      describe: 'The file to convert (see "ffmpeg -decoders" output for supported codecs)',
    })
    .option("audiobitrate", {
      type: "number",
      describe: "The target bitrate for the audio (in kbps)",
    })
    .option("videobitrate", {
      type: "number",
      describe: "The target bitrate for the video (in kbps)",
    })
    .option("resize", {
      type: "string",
      describe: "The target size for the video (640x480, 640x?, ?x480)",
    });
};

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file, audiobitrate, videobitrate, resize } = argv;

  try {
    // Convert the file to mp4
    console.log("Convert the file to mp4");
    await encode(file, "mp4", { audioBitrate: audiobitrate, videoBitrate: videobitrate, resize: resize });

    // Convert the file to webm
    console.log("Convert the file to webm");
    await encode(file, "webm", { audioBitrate: audiobitrate, videoBitrate: videobitrate, resize: resize });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
