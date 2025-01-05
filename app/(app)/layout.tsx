import AddRequest from "@/app/(app)/_components/add-request";
import SearchKPI from "@/app/(app)/_components/kpi-search";
import KPITabs from '@/app/(app)/_components/tabs';


export default function Home({children}: {children: React.ReactNode}) {
  return (
    <main className="flex flex-col items-center justify-between p-12 z-10 max-w-5xl mx-auto space-y-12">
      {/* TOP */}
      <div className="text-5xl font-bold">Library</div>
      <div className="font-medium">
        Browse for assets needed to report and present analysis
      </div>
      {/* SEARCH */}
      <SearchKPI />
      {/* TABS */}
      <KPITabs>{children}</KPITabs>
      {/* ADD */}
      <AddRequest />
    </main>
  );
}
