import {Suspense} from 'react';

export default function StoryBoardTab() {
	return (
		<Suspense fallback={<div>Loading Storyboards...</div>}>
			<div>Storyboards</div>
		</Suspense>
	);
}
