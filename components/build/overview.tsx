"use client";

import { TeamWholeKeys, useTeamState, useTeamStore } from "@/lib/task";
import { zFilter } from "@/lib/zustand";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useMemo } from "react";

export function Overview() {
  const [teamData] = useTeamStore((state) => [state.team]);

  const [teamTask] = useTeamState((state) => [
    state.dam,
  ]);

  let data = [
    ...teamData.map((key) => ({
      name: key?.name,
      total: teamTask[key?.id]?.length,
    })),
    { name: "unassigned", total: teamTask.unassigned?.length },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data?.length === 0 ? [{ name: "No team", total: 0 }] : data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          className="fill-card-foreground"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export const TotalTasks = () => {
  const [teamTask] = useTeamState((state) => [
    state.dam
  ]);

  const total = useMemo(
    () => {
      let total = 0
      Object.values(teamTask).forEach((x) => total += x?.length || 0)
      return total
    },
    [teamTask]
  );
  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total}</div>
          <p className="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unassigned tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teamTask.unassigned.length}</div>
          <p className="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
    </div>
  );
};
