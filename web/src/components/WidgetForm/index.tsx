/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react';
import bugImageUrl from '../../assets/bug.svg';
import ideaImageUrl from '../../assets/idea.svg';
import otherImageUrl from '../../assets/other.svg';
import FeedbackTypeStep from './Steps/FeedbackTypeStep';
import FeedbackTypeContentStep from './Steps/FeedbackTypeContentStep';
import FeedbackTypeSuccess from './Steps/FeedbackTypeSuccess';

export const feedbackTypes = {
	BUG: {
		title: 'Problema',
		image: {
			source: bugImageUrl,
			alt: 'Imagem de um Inseto',
		},
	},
	IDEA: {
		title: 'Ideia',
		image: {
			source: ideaImageUrl,
			alt: 'Imagem de uma Lâmpada',
		},
	},
	OTHER: {
		title: 'Outro',
		image: {
			source: otherImageUrl,
			alt: 'Imagem de um balão de pensamento',
		},
	},
};

export type FeedbackType = keyof typeof feedbackTypes;

export default function WidgetForm() {
	const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
	const [feedbackSent, setFeedbackSent] = useState(false);

	function handleRestartFeedback() {
		setFeedbackSent(false);
		setFeedbackType(null);
	}

	return (
		<div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto h-[280px]">
			{feedbackSent ? (
				<FeedbackTypeSuccess onFeedbackRestartRequest={handleRestartFeedback} />
			) : (
				<>
					{!feedbackType ? (
						<FeedbackTypeStep setFeedbackType={setFeedbackType} />
					) : (
						<FeedbackTypeContentStep
							feedbackType={feedbackType}
							onFeedbackRestartRequested={handleRestartFeedback}
							onFeedbackSent={() => setFeedbackSent(true)}
						/>
					)}
				</>
			)}

			<footer className="text-xs text-neutral-400">
				Feito com ♥ pela{' '}
				<a
					className="underline underline-offset-2"
					href="https://rocketseat.com.br"
				>
					Rocketseat
				</a>
			</footer>
		</div>
	);
}
