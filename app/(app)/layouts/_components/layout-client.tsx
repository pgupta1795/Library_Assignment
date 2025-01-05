'use client';

import {KPICardDialog} from '@/components/card/kpi-card-dialog';
import {KpiChart} from '@/components/card/kpi-charts';
import {Kpi} from '@/lib/db/schema';

type KpiWithDetails=Kpi&{
	tags: string[];
	questions: string[];
	stats: {
		commits: number;
		type: string;
		pages: number;
		lastUpdated: Date;
	}|null;
};

interface LayoutClientProps {
	kpis: KpiWithDetails[];
}

export function LayoutClient({kpis}: LayoutClientProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{kpis.map((kpi) => (
				<KPICardDialog key={kpi.id} {...kpi}>
					<div
						className="p-4 cursor-pointer hover:shadow-md transition-shadow rounded-xl border bg-card text-card-foreground shadow"
					>
						<div className="aspect-video relative mb-3">
							<div className="w-full h-full bg-muted rounded-md overflow-hidden">
								<KpiChart />
							</div>
						</div>

						<h3 className="font-semibold">{kpi.title}</h3>
						<p className="text-sm text-muted-foreground line-clamp-2">
							{kpi.description}
						</p>

						{kpi.tags.length>0&&(
							<div className="mt-2 flex flex-wrap gap-1">
								{kpi.tags.map((tag) => (
									<span
										key={tag}
										className="text-xs bg-muted px-2 py-1 rounded-full"
									>
										{tag}
									</span>
								))}
							</div>
						)}
					</div>
				</KPICardDialog>
			))}
		</div>
	);
}