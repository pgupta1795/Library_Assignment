'use client'

import {Tabs,TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs";
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {useEffect,useState} from 'react';

const KPITabs=({children}: {children: React.ReactNode}) => {
	const [value,setValue]=useState('featured');
	const pathname=usePathname();
	const router=useRouter();

	useEffect(() => {
		setValue(pathname.split('/')[1]);
	},[pathname]);

	return (
		<Tabs className="w-full" defaultValue="featured" onValueChange={(value) => {
			setValue(value);
			router.push(`/${value}`);
		}}>
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger value="featured">
					<Link href="/featured">Featured</Link>
				</TabsTrigger>
				<TabsTrigger value="kpi">
					<Link href="/kpi">KPI</Link>
				</TabsTrigger>
				<TabsTrigger value="layouts">
					<Link href="/layouts">Layouts</Link>
				</TabsTrigger>
				<TabsTrigger value="storyboards">
					<Link href="/storyboards">Storyboards</Link>
				</TabsTrigger>
			</TabsList>
			<TabsContent value={value}>
				{children}
			</TabsContent>
		</Tabs>
	)
}

export default KPITabs