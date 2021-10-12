import { Arguments, Argv } from 'yargs';
import { encode } from '../encoder';

type Options = {
  file: string;
};

export const command: string = 'audio <file>';
export const desc: string = 'Convert the audio file <file>';

export const builder = (yargs: Argv): Argv => {
  return yargs
    .positional('file', { type: 'string', demandOption: true });
};

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { file } = argv;

  try {
    // Convert the file to m4a
    console.log('Convert the file to m4a');
    await encode(file, 'm4a');

    // Convert the file to weba
    console.log('Convert the file to weba');
    await encode(file, 'weba');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
