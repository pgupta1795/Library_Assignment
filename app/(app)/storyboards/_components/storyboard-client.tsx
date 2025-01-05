'use client';

import KPICard from '@/components/card/kpi-card';
import {KpiWithDetails} from '@/lib/types';
import {useState} from 'react';

type Column={
	id: string;
	title: string;
	kpis: KpiWithDetails[];
};

export function StoryboardClient({initialKpis}: {initialKpis: KpiWithDetails[]}) {
	const [columns,setColumns]=useState<{[key: string]: Column}>(() => ({
		'to-do': {
			id: 'to-do',
			title: 'To Do',
			kpis: initialKpis,
		},
		'in-progress': {
			id: 'in-progress',
			title: 'In Progress',
			kpis: [],
		},
		'done': {
			id: 'done',
			title: 'Done',
			kpis: [],
		},
	}));

	const handleDragStart=(e: React.DragEvent,kpiId: string,oldColumn: string) => {
		e.dataTransfer.setData('application/json',JSON.stringify({
			kpiId,
			oldColumn
		}));
	};

	const handleDragOver=(e: React.DragEvent) => {
		e.preventDefault();
		const target=e.target as HTMLElement;
		if (target.classList.contains('droppable')) {
			target.classList.add('bg-purple-100');
		}
	};

	const handleDragLeave=(e: React.DragEvent) => {
		const target=e.target as HTMLElement;
		if (target.classList.contains('droppable')) {
			target.classList.remove('bg-purple-100');
		}
	};

	const handleDrop=(e: React.DragEvent,targetColumnId: string) => {
		e.preventDefault();
		const target=e.target as HTMLElement;
		target.classList.remove('bg-purple-100');

		const data=JSON.parse(e.dataTransfer.getData('application/json'));
		const {kpiId,oldColumn}=data;

		if (oldColumn===targetColumnId) return;

		const sourceColumn=columns[oldColumn];
		const targetColumn=columns[targetColumnId];

		const kpiIndex=sourceColumn.kpis.findIndex(kpi => kpi.id===kpiId);
		if (kpiIndex===-1) return;

		const [kpi]=sourceColumn.kpis.splice(kpiIndex,1);
		targetColumn.kpis.push(kpi);

		setColumns({
			...columns,
			[oldColumn]: sourceColumn,
			[targetColumnId]: targetColumn,
		});
	};

	return (
		<div className="flex gap-4 p-4 h-[calc(100vh-4rem)] overflow-x-auto">
			{Object.values(columns).map((column) => {
				return (
					<div
						key={column.id}
						className="flex flex-col w-80 bg-gray-100 rounded-lg p-4"
					>
						<h2 className="font-semibold mb-4">{column.title}</h2>
						<div
							className="flex-1 overflow-y-auto droppable transition-colors"
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={(e) => handleDrop(e,column.id)}
						>
							{column.kpis.map((kpi) => (
								<div
									key={kpi.id}
									draggable
									onDragStart={(e) => handleDragStart(e,kpi.id,column.id)}
									className="mb-2 cursor-move"
								>
									<KPICard {...kpi} />
								</div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
} 