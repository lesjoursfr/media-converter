import { Arguments, Argv } from 'yargs';
import { encode } from '../encoder';

type Options = {
  file: string;
  audiobitrate?: number;
};

export const command = 'audio <file>';
export const desc = 'Convert the audio file';

export const builder = (yargs: Argv): Argv => {
  return yargs
    .positional('file', {
      type: 'string',
      demandOption: true,
      describe: 'The file to convert (see "ffmpeg -decoders" output for supported codecs)'
    })
    .option('audiobitrate', {
      type: 'number',
      describe: 'The target bitrate for the audio (in kbps)'
    });
};

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file, audiobitrate } = argv;

  try {
    // Convert the file to m4a
    console.log('Convert the file to m4a');
    await encode(file, 'm4a', { audioBitrate: audiobitrate });

    // Convert the file to weba
    console.log('Convert the file to weba');
    await encode(file, 'weba', { audioBitrate: audiobitrate });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
