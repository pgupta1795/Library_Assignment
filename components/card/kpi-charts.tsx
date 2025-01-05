import {Area,AreaChart,Bar,BarChart,CartesianGrid,Line,LineChart,Pie,PieChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts';

const sampleData=[
	{date: '2024-01',value: 400},
	{date: '2024-02',value: 300},
	{date: '2024-03',value: 600},
	{date: '2024-04',value: 800},
	{date: '2024-05',value: 500}
];

const pieData=[
	{name: 'Group A',value: 400},
	{name: 'Group B',value: 300},
	{name: 'Group C',value: 300},
	{name: 'Group D',value: 200}
];

const charts={
	area: (
		<AreaChart data={sampleData} margin={{top: 10,right: 30,left: 0,bottom: 0}}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="date" />
			<YAxis />
			<Tooltip />
			<Area type="step" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
		</AreaChart>
	),
	line: (
		<LineChart data={sampleData} margin={{top: 10,right: 30,left: 0,bottom: 0}}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="date" />
			<YAxis />
			<Tooltip />
			<Line type="monotone" dataKey="value" stroke="#82ca9d" />
		</LineChart>
	),
	bar: (
		<BarChart data={sampleData} margin={{top: 10,right: 30,left: 0,bottom: 0}}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="date" />
			<YAxis />
			<Tooltip />
			<Bar dataKey="value" fill="#8884d8" />
		</BarChart>
	),
	pie: (
		<PieChart margin={{top: 10,right: 30,left: 0,bottom: 0}}>
			<Pie
				data={pieData}
				dataKey="value"
				nameKey="name"
				cx="50%"
				cy="50%"
				outerRadius={60}
				fill="#8884d8"
			/>
			<Tooltip />
		</PieChart>
	)
};

export type ChartType=keyof typeof charts;

export function KpiChart() {
	const chartTypes=Object.keys(charts) as ChartType[];
	const randomChart=chartTypes[Math.floor(Math.random()*chartTypes.length)];

	return (
		<ResponsiveContainer width="100%" height="100%">
			{charts[randomChart]}
		</ResponsiveContainer>
	);
}