"use client";

import { Skeleton } from "@/components/ui/skeleton"
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./team-items";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTaskStore, useTeamStore } from "@/lib/task";

type ItemsProps = {
  id: string
  items: string[]
}
export default function Container(props: ItemsProps) {
  const { id, items } = props;
  const [tasks] = useTaskStore(state => [state.task])
  const [teamData] = useTeamStore((state) => [
    state.team,
  ]);


  const { setNodeRef } = useDroppable({
    id,
  });

  const data = teamData.find(e => e.id === id)

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <Card className="mb-5 break-inside-avoid" ref={setNodeRef}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-base font-semibold">{data?.name}</p>
              <p className="text-sm text-muted-foreground"> {data?.position} </p>
            </div>
          </div>
        </CardHeader>

        <CardContent  className="flex flex-col gap-2 p-2 flex-nowrap">
            {items.length === 0 && (
                <Skeleton className="w-full h-[20px]" />
            )}
            {items.map((item) => (
                <SortableItem key={item} id={item} item={tasks.find(e=> e.id=== item) as Task}/>
            ))}
        </CardContent>
      </Card>
    </SortableContext>
  );
}

export function UnAssigned(props: ItemsProps) {
  const { id, items } = props;
  const [tasks] = useTaskStore(state => [state.task])

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
        <CardContent  className="flex flex-col gap-3 p-2 flex-nowrap" ref={setNodeRef}>
            {items.length === 0 && ( <div className="px-4">No task</div> )}
            {items.map((item) => (
                <SortableItem key={item} id={item} item={tasks.find(e=> e.id=== item) as Task} />
            ))}
        </CardContent>
    </SortableContext>
  );
}
