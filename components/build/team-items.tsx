"use client"

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PersonIcon } from "@radix-ui/react-icons";
import { Skeleton } from "../ui/skeleton";

export function Item(props: {
  id: string;
  item?: Task
}) {
  const { id, item } = props;

  if(!item) return (
    <Card>
        <CardContent className="flex-row gap-4 space-y-0 p-4 flex items-start">
        <Skeleton className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <Skeleton className="w-full"></Skeleton>
            <Skeleton className="text-sm text-muted-foreground">
            </Skeleton>
          </div>
        </CardContent>
    </Card>
  )

  return (
    <Card>
        <CardContent className="flex-row gap-4 space-y-0 p-4 flex items-start">
        <PersonIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{item.text}</p>
            <p className="text-sm text-muted-foreground">
              {item.id}
            </p>
          </div>
        </CardContent>
    </Card>
  );
}





export default function SortableItem(props: {
  id: string
  item: Task
}) {
  const {
    attributes,
    listeners,
    transform, transition,
    setNodeRef,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} {...style} {...attributes} {...listeners}>
      <Item id={props.id} item={props.item} />
    </div>
  );
}
