"use client"

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ArchiveIcon, PersonIcon, GearIcon, CheckIcon, SymbolIcon, Cross1Icon, CrossCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Skeleton } from "../ui/skeleton";
import { Grip } from "lucide-react";

export function Item(props: {
  id: string;
  item?: Task
}) {
  const { id, item } = props;

  if(!item) return (
    <Card className="bg-muted">
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

  const date = new Date(parseInt(item?.createdAt || "0"))

  return (
    <Card className="bg-muted">
        <CardContent className="flex-row gap-4 px-4 py-5 flex items-start justify-center">
          {getLogo(item.progress)}
          <div className="">
            <p className="text-sm font-medium leading-none">{item.text}</p>
            <p className="text-sm text-muted-foreground"> {date.toLocaleDateString('en-IN')} </p>
          </div>
          <Grip className="text-muted-foreground ms-auto mt-1" size={20} />
        </CardContent>
    </Card>
  );
}

export function getLogo(string:Task["progress"]) {
  return {
    "backlog": <ArchiveIcon className="mt-px h-5 w-5 text-violet-400"/>,
    "inProgress": <SymbolIcon  className="mt-px h-5 w-5 animate-spin text-yellow-400"/>,
    "done": <CheckCircledIcon  className="mt-px h-5 w-5 text-green-400"/>,
    "todo": <CrossCircledIcon  className="mt-px h-5 w-5 text-red-400"/>,
  }[string]
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
