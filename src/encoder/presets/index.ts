import { FfmpegCommand } from 'fluent-ffmpeg';
import { configure as m4a } from './m4a';
import { configure as weba } from './weba';

/* eslint-disable no-unused-vars */
export enum Codecs {
  m4a = 'm4a',
  weba = 'weba',
}
/* eslint-enable no-unused-vars */

export function ffmpegWithCodec (ffmpeg: FfmpegCommand, codec: string) : FfmpegCommand {
  switch (codec) {
    case Codecs.m4a:
      return m4a(ffmpeg);
    case Codecs.weba:
      return weba(ffmpeg);
    default:
      throw new Error(`The codec ${codec} is not implemented !`);
  }
}
