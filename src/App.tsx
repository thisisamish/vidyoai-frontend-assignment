import { useEffect, useRef, useState } from 'react';
import Waveform from './components/Waveform';
import './App.css';
import Metadata from './components/Metadata';
import { MetadataType } from './types/MetadataType';

function App() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [videoSrc, setVideoSrc] = useState('');
	const [playing, setPlaying] = useState(false);
	const [loading, setLoading] = useState(false);
	const [metadata, setMetadata] = useState<MetadataType | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlaying(false);

		URL.revokeObjectURL(videoRef.current!.src);
		videoRef.current!.src = '';
		const file = event.target.files?.[0];

		if (file) {
			const video = videoRef.current!;
			video.preload = 'metadata';
			const videoSource = URL.createObjectURL(file);
			video.src = videoSource;
			video.onloadedmetadata = function () {
				// if (!hasAudio(video)) {
				// 	console.log(video.src);
				// 	console.log(video.webkitAudioDecodedByteCount);
				// 	URL.revokeObjectURL(video.src);
				// 	// videoRef.current!.src = '';
				// 	alert('Select a video which has audio.');
				// } else {
				setMetadata({
					Name: file.name,
					Size: file.size,
					'Media Format': file.type,
					'Last Modified': new Date(file.lastModified),
					Duration: video.duration,
				});
				setVideoSrc(videoSource);
				// }
			};
		}
	};

	const drawVid = () => {
		const ctx = canvasRef.current!.getContext('2d');
		ctx!.drawImage(videoRef.current!, 0, 0, 640, 360);
		requestAnimationFrame(drawVid);
	};

	useEffect(() => {
		if (playing) {
			videoRef.current!.play();
		} else {
			videoRef.current!.pause();
		}
		drawVid();
	});

	return (
		<main className="h-screen grid grid-cols-3 grid-rows-4 gap-4 p-4">
			<div className="fixed bottom-0 right-0 sm:max-w-[10%] max-w-[50%] p-2 bg-black rounded-tl-lg text-white">
				Find this project on{' '}
				<a
					className="underline"
					href="https://github.com/thisisamish/vidyoai-frontend-assignment"
					target="_blank"
				>
					GitHub
				</a>
			</div>

			<section className="col-span-2 row-span-3">
				<div className="border border-zinc-400 rounded-md p-4 h-full">
					<video ref={videoRef} loop className="hidden"></video>
					<div className="relative">
						<canvas
							width={640}
							height={360}
							ref={canvasRef}
						></canvas>
						<button
							className="absolute inset-0"
							onClick={() => setPlaying((prev) => !prev)}
							disabled={loading || metadata === null}
						>
							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={3.5}
								stroke="white"
								className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
								/>
							</svg> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={3.5}
								stroke="white"
								className={`w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
									playing ? 'hidden' : 'inline'
								}`}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 5.25v13.5m-7.5-13.5v13.5"
								/>
							</svg>
						</button>
					</div>
				</div>
			</section>

			<section className="col-span-1 row-span-2">
				<div className="border border-zinc-400 rounded-md h-full p-4">
					<h2 className="font-semibold text-lg mb-2">
						Audio Waveform:
					</h2>
					{videoRef.current && (
						<Waveform
							videoEl={videoRef.current}
							loading={loading}
							setLoading={setLoading}
							videoSrc={videoSrc}
						/>
					)}
				</div>
			</section>

			<section className="col-span-1 row-span-2 border border-zinc-400 rounded-md p-4 flex justify-center items-center">
				{metadata ? (
					<Metadata metadata={metadata} />
				) : (
					<p className="opacity-70">
						Selected video's metadata will be shown here.
					</p>
				)}
			</section>

			<section className="col-span-2 row-span-1">
				<div className="border border-zinc-400 rounded-md p-4 flex flex-col h-full gap-2">
					<label
						htmlFor="videoInput"
						className="font-semibold text-lg"
					>
						Choose a video file to process:
					</label>
					<input
						type="file"
						id="videoInput"
						name="videoInput"
						accept="video/*"
						multiple={false}
						onChange={handleFileChange}
						disabled={loading}
					/>
				</div>
			</section>
		</main>
	);
}

export default App;
