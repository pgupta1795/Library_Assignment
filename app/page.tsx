import AddRequest from "@/components/add-request";
import SearchKPI from "@/components/kpi-search";
import KPITabs from "@/components/kpi-tabs";

export default function Home() {
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
      <KPITabs />
      {/* ADD */}
      <AddRequest />
    </main>
  );
}
