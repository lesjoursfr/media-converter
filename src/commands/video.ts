import { Arguments, Argv } from 'yargs';
import { encode } from '../encoder';

type Options = {
  file: string;
};

export const command: string = 'video <file>';
export const desc: string = 'Convert the video file <file>';

export const builder = (yargs: Argv): Argv => {
  return yargs
    .positional('file', { type: 'string', demandOption: true });
};

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file } = argv;

  try {
    // Convert the file to mp4
    console.log('Convert the file to mp4');
    await encode(file, 'mp4');

    // Convert the file to webm
    console.log('Convert the file to webm');
    await encode(file, 'webm');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
