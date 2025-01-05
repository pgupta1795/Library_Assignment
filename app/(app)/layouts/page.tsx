import {Suspense} from 'react';

export default function LayoutsTab() {
	return (
		<Suspense fallback={<div>Loading Layouts...</div>}>
			<div>Layouts</div>
		</Suspense>
	);
}
