import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "../../components/build/date-range-picker"
import { MainNav } from "../../components/build/main-nav"
import { Overview } from "../../components/build/overview"
import { AllTeam } from "../../components/build/recent-sales"
import { Search } from "../../components/build/search"
import TeamSwitcher from "../../components/build/team-switcher"
import { UserNav } from "../../components/build/user-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Team from "@/components/build/team-dnd"
import Self from "@/components/build/self-dnd"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
  return (
    <>

      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>

          <Tabs defaultValue="dashboard" className="">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="team"> Team </TabsTrigger>
              <TabsTrigger value="self"> Self </TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="space-y-4">
                <div className="masonry-2-col sm:masonry-3-col md:masonry-4-col [column-fill:_balance]">
                    <Team/>
                </div>  
            </TabsContent>
            <TabsContent value="self" className="space-y-4">
                <div className="grid grid-cols-3 items-start sm:grid-cols-4 md:grid-cols-5 gap-4">
                    <Card></Card>
                    <Self/>
                </div>  
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">173</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-5">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>All team</CardTitle>
                    <CardDescription>
                      Total 70 members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AllTeam />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}