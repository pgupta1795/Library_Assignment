import {getKpis} from '@/lib/actions';
import {Suspense} from 'react';
import {StoryboardClient} from './_components/storyboard-client';

export default async function StoryBoardTab() {
	const kpis=await getKpis();

	return (
		<Suspense fallback={<div>Loading Storyboards...</div>}>
			<StoryboardClient initialKpis={kpis} />
		</Suspense>
	);
}
