import { Metadata } from "next";

import { Overview, TotalTasks } from "@/components/build/overview";
import { AllTeam } from "@/components/build/recent-sales";
import Self from "@/components/build/self-dnd";
import Team from "@/components/build/team-dnd";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">

          <Tabs defaultValue="dashboard">
            <TabsList className="bg-card border shadow-sm h-auto">
              <TabsTrigger className="w-auto h-10 text-2xl px-6" value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger className="w-auto h-10 text-2xl px-6" value="team"> Team </TabsTrigger>
              <TabsTrigger className="w-auto h-10 text-2xl px-6" value="self"> Self </TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="space-y-4 mt-4">
              <div className="masonry-2-col sm:masonry-3-col md:masonry-4-col [column-fill:_balance]">
                <Team />
              </div>
            </TabsContent>

            <TabsContent value="self" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 items-start sm:grid-cols-4 md:grid-cols-5 gap-4">
                <Self />
              </div>
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-4 mt-4">
              <TotalTasks />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-2 lg:col-span-5 ">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>

                <AllTeam />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
