import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
	videoEl: HTMLMediaElement;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	videoSrc: string;
}

export default function Waveform({
	videoEl,
	videoSrc,
}: // loading,
// setLoading,
WaveformProps) {
	const waveformContainerRef = useRef<HTMLDivElement>(null);
	const [ws, setWs] = useState<WaveSurfer | null>(null);

	useEffect(() => {
		console.log('Wavesurfer created!');
		setWs((prev) => {
			prev?.destroy();
			return WaveSurfer.create({
				container: waveformContainerRef.current!,
				media: videoEl,
			});
		});

		return () => {
			ws?.destroy();
		};
	}, [videoSrc]);

	useEffect(() => {
		if (ws) {
			ws.on('ready', function () {
				ws.setTime(1);
			});
		}
	}, [ws]);

	return <div ref={waveformContainerRef} className="waveformContainer"></div>;
}
