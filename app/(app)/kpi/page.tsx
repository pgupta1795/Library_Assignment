import KPICard from "@/components/card/kpi-card";
import {KPICardDialog} from "@/components/card/kpi-card-dialog";
import {KpiData} from '@/lib/types';
import {Suspense} from 'react';

export default async function KpiTab({
	searchParams,
}: {
	searchParams: {search?: string};
}) {
	const searchQuery=await searchParams?.search||'';
	const response=await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/kpis${searchQuery? `?search=${searchQuery}`:''}`,
		{cache: 'no-store'}
	);

	if (!response.ok) throw new Error('Failed to fetch KPIs');
	const kpis: KpiData[]=await response.json();
	return (
		<Suspense fallback={<div>Loading KPIs...</div>}>
			<div className="flex flex-col space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{kpis.map((item) => (
						<KPICardDialog
							key={item.id}
							{...item}
							favorite={item.favorite}
						>
							<KPICard title={item.title} description={item.description} id={item.id} favorite={item.favorite} />
						</KPICardDialog>
					))}
				</div>
			</div>
		</Suspense>
	);
}
