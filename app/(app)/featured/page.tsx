import KPICard from "@/components/card/kpi-card";
import {KPICardDialog} from "@/components/card/kpi-card-dialog";
import {KpiData} from '@/lib/types';
import {Suspense} from 'react';

async function KpiList() {
	const response=await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/kpis`,{
		cache: 'no-store',
	});
	if (!response.ok) throw new Error('Failed to fetch KPIs');
	const kpis: KpiData[]=await response.json();

	return (
		<div className="flex flex-col space-y-10 gap-8">
			<div>
				<div className="text-2xl font-bold self-start">Featured</div>
				<div className="font-semibold self-start text-muted-foreground mb-4">
					Curated Top picks from this week
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{kpis.slice(0,3).map((item) => (
						<KPICardDialog
							key={item.id}
							id={item.id}
							title={item.title}
							description={item.description}
							tags={item.tags}
							stats={item.stats}
							questions={item.questions}
							favorite={item.favorite}
						>
							<KPICard id={item.id} title={item.title} description={item.description} favorite={item.favorite} />
						</KPICardDialog>
					))}
				</div>
			</div>

			<div>
				<div className="text-2xl font-bold self-start">Trending</div>
				<div className="font-semibold self-start text-muted-foreground mb-4">
					Most popular by community
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{kpis.slice(3).map((item) => (
						<KPICardDialog
							key={item.id}
							id={item.id}
							title={item.title}
							description={item.description}
							tags={item.tags}
							stats={item.stats}
							questions={item.questions}
							favorite={item.favorite}
						>
							<KPICard id={item.id} title={item.title} description={item.description} favorite={item.favorite} />
						</KPICardDialog>
					))}
				</div>
			</div>
		</div>
	);
}

export default function FeaturedTab() {
	return (
		<Suspense fallback={<div>Loading KPIs...</div>}>
			<KpiList />
		</Suspense>
	);
}
