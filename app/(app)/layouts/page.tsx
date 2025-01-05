import {LayoutClient} from '@/app/(app)/layouts/_components/layout-client';
import {getKpis} from '@/lib/actions';


export default async function LayoutsTab() {
	const kpis=await getKpis();
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Report Layouts</h1>
			<LayoutClient kpis={kpis} />
		</div>
	);
}
