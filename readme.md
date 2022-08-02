[![npm version](https://badge.fury.io/js/@lesjoursfr%2Fmedia-converter.svg)](https://badge.fury.io/js/@lesjoursfr%2Fmedia-converter)
[![QC Checks](https://github.com/lesjoursfr/media-converter/actions/workflows/quality-control.yml/badge.svg)](https://github.com/lesjoursfr/media-converter/actions/workflows/quality-control.yml)

# media-converter

An audio/video converter using [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg).

## Audio

The audio converter output 2 files :

-   An m4a file with ACC @ 256kbps
-   A weba file with Opus @ 256kbps

Usage

```bash
ljconverter audio sound.wav
```

To change the audio bitrate you can pass the target bitrate in kbps to the `audiobitrate` parameter.

```bash
ljconverter audio sound.wav --audiobitrate 128
```

## Video

The video converter output 2 files :

-   An mp4 file with ACC @ 256kbps & H.264 @ 4000kbps
-   A webm file with Opus @ 256kbps & VP9 @ 4000kbps

Usage

```bash
ljconverter video video.mts
```

To change the audio and video bitrates you can pass the targets bitrates in kbps to `audiobitrate` & `videobitrate` parameters.

```bash
ljconverter video video.mts --audiobitrate 128 --videobitrate 2000
```

You can also resize the video with the `resize` parameter (see the [fluent-ffmpeg frame size options](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#sizesize-set-output-frame-size) for all available formats)

```bash
ljconverter video video.mts --resize 720x?
```
