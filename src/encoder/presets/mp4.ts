import { FfmpegCommand } from 'fluent-ffmpeg';

export function configure (ffmpeg: FfmpegCommand) : FfmpegCommand {
  ffmpeg
    .format('mp4')
    .videoBitrate('4000k')
    .videoCodec('libx264')
    .audioBitrate('320k')
    .audioCodec('aac')
    .audioChannels(2)
    .outputOptions([
      // https://www.ffmpeg.org/ffmpeg-codecs.html#libx264_002c-libx264rgb
      // https://trac.ffmpeg.org/wiki/Encode/H.264
      '-preset veryslow', // A preset is a collection of options that will provide a certain encoding speed to compression ratio. A slower preset will provide better compression (compression is quality per filesize).
      '-minrate 500k', // (minsection-pct) Set GOP min bitrate in bits/s. Note vpxenc’s option is specified as a percentage of the target bitrate, the libvpx wrapper converts this value as follows: (minrate * 100 / bitrate)
      '-maxrate 6000k', // (maxsection-pct) Set GOP max bitrate in bits/s. Note vpxenc’s option is specified as a percentage of the target bitrate, the libvpx wrapper converts this value as follows: (maxrate * 100 / bitrate)
      '-movflags +faststart' // You can add -movflags +faststart as an output option if your videos are going to be viewed in a browser.
    ]);

  return ffmpeg;
};
