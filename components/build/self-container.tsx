"use client";

import { Skeleton } from "@/components/ui/skeleton"
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "./self-items";
import { Card, CardContent, CardHeader } from "../ui/card"

type ItemsProps = {
  id:string
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
      <Card className="break-inside-avoid" ref={setNodeRef}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          backlog {items.length}
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
