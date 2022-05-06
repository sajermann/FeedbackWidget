import { ArrowLeft } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import api from '../../../lib/api';
import CloseButton from '../../CloseButton';
import Loading from '../../Loading';
import ScreenshotButton from './ScreenshotButton';

interface Props {
	feedbackType: FeedbackType;
	onFeedbackRestartRequested: () => void;
	onFeedbackSent: () => void;
}
export default function FeedbackTypeContentStep({
	feedbackType,
	onFeedbackRestartRequested,
	onFeedbackSent,
}: Props) {
	const [screenshot, setScreenshot] = useState<string | null>(null);
	const feedbackTypesInfo = feedbackTypes[feedbackType];
	const [comment, setComment] = useState('');
	const [isSendingFeedback, setIsSendingFeedback] = useState(false);

	async function handleSubmitFeedback(e: FormEvent) {
		e.preventDefault();
		setIsSendingFeedback(true);
		await api.post('/feedbacks', {
			type: feedbackType,
			comment,
			screenshot,
		});
		setIsSendingFeedback(false);

		onFeedbackSent();
	}

	return (
		<>
			<header>
				<button
					type="button"
					className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
					onClick={onFeedbackRestartRequested}
				>
					<ArrowLeft weight="bold" className="w-4 h-4" />
				</button>

				<span className="text-xl leading-6 flex items-center gap-2">
					<img
						src={feedbackTypesInfo.image.source}
						alt={feedbackTypesInfo.image.alt}
						className="w-6 h-6"
					/>
					{feedbackTypesInfo.title}
				</span>
				<CloseButton />
			</header>
			<form className="my-4 w-[304px]" onSubmit={handleSubmitFeedback}>
				<textarea
					className="min-w[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
					placeholder="Conte com detalhes o que está acontecendo..."
					onChange={e => setComment(e.target.value)}
				/>

				<footer className="flex gap-2 mt-2">
					<ScreenshotButton
						onScreenshotTook={setScreenshot}
						screenshot={screenshot}
					/>

					<button
						disabled={comment.length === 0 || isSendingFeedback}
						type="submit"
						className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
					>
						{isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
					</button>
				</footer>
			</form>
		</>
	);
}
