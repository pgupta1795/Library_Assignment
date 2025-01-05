import FeaturedTab from "./tabs/featured-tab";
import KPITab from "./tabs/kpi-tab";
import LayoutsTab from "./tabs/layouts-tab";
import StoryBoardTab from "./tabs/storyboards-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function KPITabs() {
  return (
    <Tabs className="w-full" defaultValue="Featured">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="Featured">Featured</TabsTrigger>
        <TabsTrigger value="KPI">KPI</TabsTrigger>
        <TabsTrigger value="Layouts">Layouts</TabsTrigger>
        <TabsTrigger value="Storyboards">Storyboards</TabsTrigger>
      </TabsList>
      <TabsContent value="Featured">
        <FeaturedTab />
      </TabsContent>
      <TabsContent value="KPI">
        <KPITab />
      </TabsContent>
      <TabsContent value="Layouts">
        <LayoutsTab />
      </TabsContent>
      <TabsContent value="Storyboards">
        <StoryBoardTab />
      </TabsContent>
    </Tabs>
  );
}
