import { FfmpegCommand } from 'fluent-ffmpeg';
import { configure as m4a } from './m4a';
import { configure as mp4 } from './mp4';
import { configure as weba } from './weba';
import { configure as webm } from './webm';

/* eslint-disable no-unused-vars */
export enum Codecs {
  // Audio codecs
  m4a = 'm4a',
  weba = 'weba',
  // Video codecs
  mp4 = 'mp4',
  webm = 'webm',
}
/* eslint-enable no-unused-vars */

export function ffmpegWithCodec (ffmpeg: FfmpegCommand, codec: string) : FfmpegCommand {
  switch (codec) {
    // Audio codecs
    case Codecs.m4a:
      return m4a(ffmpeg);
    case Codecs.weba:
      return weba(ffmpeg);
    // Video codecs
    case Codecs.mp4:
      return mp4(ffmpeg);
    case Codecs.webm:
      return webm(ffmpeg);
    // Unknown codec : Throw an error
    default:
      throw new Error(`The codec ${codec} is not implemented !`);
  }
}
