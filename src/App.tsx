import { useEffect, useRef, useState } from 'react';
import Waveform from './components/Waveform';
import './App.css';

type MetadataType = {
	Name: string;
	Size: number;
	'Media Format': string;
	'Last Modified': Date;
};

function App() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [playing, setPlaying] = useState(false);
	const [loading, setLoading] = useState(false);
	const [metadata, setMetadata] = useState<MetadataType | null>(null);
	const [duration, setDuration] = useState(0);

	const formatDuration = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		return {
			hours,
			minutes,
			seconds: remainingSeconds,
		};
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlaying(false);
		URL.revokeObjectURL(videoRef.current!.src);

		const file = event.target.files?.[0];
		if (file) {
			const video = videoRef.current!;
			video.preload = 'metadata';

			setMetadata({
				Name: file.name,
				Size: file.size,
				'Media Format': file.type,
				'Last Modified': new Date(file.lastModified),
			});

			video.onloadedmetadata = function () {
				setDuration(video.duration);
			};
			video.src = URL.createObjectURL(file);
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
		<main className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-4 p-4">
			<div className="fixed bottom-0 left-0 sm:max-w-[10%] max-w-[50%] p-2 bg-black rounded-tr-lg text-white">
				Find this project on{' '}
				<a
					className="underline"
					href="https://github.com/thisisamish/vidyoai-frontend-assignment"
					target="_blank"
				>
					GitHub
				</a>
			</div>
			<section className="flex flex-col gap-4">
				<div className="border border-zinc-400 rounded-md p-4 flex flex-col gap-2">
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
				<div className="border border-zinc-400 rounded-md p-4">
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
							disabled={loading}
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
			<section className="flex flex-col gap-4">
				<div className="border border-zinc-400 rounded-md p-4">
					<h2 className="font-semibold text-lg mb-2">
						Audio Waveform:
					</h2>
					<Waveform
						videoEl={
							videoRef.current === null
								? undefined
								: videoRef.current
						}
						loading={loading}
						setLoading={setLoading}
					/>
				</div>
				<div className="border border-zinc-400 rounded-md p-4">
					<h2 className="font-semibold text-lg mb-2">
						Video Metadata:
					</h2>
					{metadata ? (
						<table>
							<tbody>
								{Object.entries(metadata).map(
									([key, value]) => {
										if (value instanceof Date)
											value = value.toLocaleString();
										else if (typeof value === 'number')
											value = (
												value /
												1024 /
												1024
											).toFixed(2);
										return (
											<tr key={key}>
												<td>{key}:</td>
												<td className="pl-4">
													{value}{' '}
													{key === 'Size' ? 'MB' : ''}
												</td>
											</tr>
										);
									}
								)}
								<tr>
									<td>Duration:</td>
									<td className="pl-4">
										{Math.round(
											formatDuration(duration).hours
										)}{' '}
										hours,{' '}
										{Math.round(
											formatDuration(duration).minutes
										)}{' '}
										minutes,{' '}
										{Math.round(
											formatDuration(duration).seconds
										)}{' '}
										seconds
									</td>
								</tr>
							</tbody>
						</table>
					) : (
						<p>Please select a video file.</p>
					)}
				</div>
			</section>
		</main>
	);
}

export default App;
