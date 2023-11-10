# vidyo.ai Frontend Internship Assignment

This repo is my submission of frontend assignment for [vidyo.ai](https://vidyo.ai/)'s SELECT 2024 internship. The assignment is available [here](https://github.com/vidyo-ai/frontend-internship-assignment).

This project was bootstrapped with Vite. It uses React with TypeScript and Tailwind CSS.

To view the deployed project, visit [this link](https://vidyoai-frontend-assignment.vercel.app/).

To run the project locally,
1. Clone the project: `git clone https://github.com/thisisamish/vidyoai-frontend-assignment.git`.
2. Run `pnpm install`.
3. Run `pnpm dev`.

If you don't have `pnpm`, get it [here](https://pnpm.io/). Trust me, it's worth it.

### Known Issues in the Project:
These issues are known to me and I am working on solving them. I tried my best to solve them before the deadline but was unable to do so. I'll still keep trying.
1. **Checking if the video has audio or not**: This is surprisingly hard. Chrome only supports webkitAudioDecodedByteCount property in HTMLVideoElement and this property always gives some positive integer (after an initial delay in loading the content). I tried both the examples given in the assignment but both of them gave positive integer value for webkitAudioDecodedCount even though one of the examples is supposed to have no audio.
2. **Waveform doesn't re-render when a new file is selected**: This seems to be an issue related to wavesurfer.js. I tried destroying previous instances of wavesurfer when a new file is loaded but for some reason, it doesn't work. It must be noted that the audio and video play flawlessly; it's the actual waveform that doesn't reload.
3. **No loading states when wavesurfer is loading the waveform**
4. **A thumbnail of the video should be automatically displayed when a new file is selected**