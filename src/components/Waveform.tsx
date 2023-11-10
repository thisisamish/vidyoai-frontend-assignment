import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
	videoEl: HTMLMediaElement | undefined;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Waveform({
	videoEl,
	loading,
	setLoading,
}: WaveformProps) {
	const waveformContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const wavesurfer = WaveSurfer.create({
			container: waveformContainerRef.current!,
			waveColor: 'violet',
			progressColor: 'purple',
			cursorColor: 'black',
			cursorWidth: 1,
			media: videoEl,
		});

		wavesurfer.on('ready', function () {
			setLoading(false);
			wavesurfer.play();
		});

		return () => {
			wavesurfer.destroy();
		};
	}, [videoEl, loading, setLoading]);

	return <div ref={waveformContainerRef} className="waveformContainer"></div>;
}
