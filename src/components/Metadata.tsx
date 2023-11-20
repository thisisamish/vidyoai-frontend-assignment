import { MetadataType } from '../types/MetadataType';

export default function Metadata({ metadata }: { metadata: MetadataType }) {
	const formatDuration = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = (seconds % 60).toPrecision(2);

		const formattedHours = hours === 0 ? '' : `${hours} hours, `;
		const formattedMinutes = minutes === 0 ? '' : `${minutes} minutes, `;
		const formattedSeconds =
			remainingSeconds === '0' ? '' : `${remainingSeconds} seconds`;

		return formattedHours + formattedMinutes + formattedSeconds;
	};

	const formattedMetadata = {
		...metadata,
		Size: (metadata.Size / 1024 / 1024).toFixed(2) + 'MB',
		Duration: formatDuration(metadata.Duration),
		'Last Modified': metadata['Last Modified'].toLocaleString(),
	};

	return (
		<div>
			<h2 className="font-semibold text-lg mb-2">Video Metadata:</h2>
			{metadata ? (
				<table>
					<tbody>
						{Object.entries(formattedMetadata).map(
							([key, value]) => (
								<tr key={key}>
									<td>{key}:</td>
									<td className="pl-4">{value}</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			) : (
				<p>Please select a video file.</p>
			)}
		</div>
	);
}
