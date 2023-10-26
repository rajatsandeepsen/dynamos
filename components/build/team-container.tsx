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

type ItemsProps = {
  id: string
  items: any[]
}
export default function Container(props: ItemsProps) {
  const { id, items } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

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
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent  className="flex flex-col gap-1 p-2 flex-nowrap">
            {items.length === 0 && (
                <Skeleton className="w-full h-[20px]" />
            )}
            {items.map((id) => (
                <SortableItem key={id} id={id} />
            ))}
        </CardContent>
      </Card>
    </SortableContext>
  );
}
