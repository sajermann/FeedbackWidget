import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';
import { useState } from 'react';
import Loading from '../../Loading';

interface Props {
	onScreenshotTook: (screenshot: string | null) => void;
	screenshot: string | null;
}

export default function ScreenshotButton({
	onScreenshotTook,
	screenshot,
}: Props) {
	const [isTakingScreenshot, setIstakeScreenshot] = useState(false);
	async function handleTakeScrteenshot() {
		setIstakeScreenshot(true);
		const canvas = await html2canvas(document.querySelector('html')!);
		const base64Image = canvas.toDataURL('image/png');
		onScreenshotTook(base64Image);
		setIstakeScreenshot(false);
	}

	if (screenshot) {
		return (
			<button
				type="button"
				className="p-1 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
				onClick={() => onScreenshotTook(null)}
				style={{
					backgroundImage: `url(${screenshot})`,
					backgroundPosition: 'right bottom',
					backgroundSize: 180,
				}}
			>
				<Trash weight="fill" />
			</button>
		);
	}

	return (
		<button
			type="button"
			className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
			onClick={handleTakeScrteenshot}
		>
			{isTakingScreenshot ? (
				<Loading />
			) : (
				<Camera className="w-6 h-6 text-zinc-100" />
			)}
		</button>
	);
}
