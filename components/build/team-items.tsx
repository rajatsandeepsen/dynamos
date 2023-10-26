"use client"

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PersonIcon } from "@radix-ui/react-icons";

export function Item(props:any) {
  const { id } = props;

  return (
    <Card>
        <CardContent className="flex-row justify-between space-y-0 p-4 flex items-start">
        <PersonIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Available {id}</p>
            <p className="text-sm text-muted-foreground">
              Only mentions and comments.
            </p>
          </div>
        </CardContent>
    </Card>
  );
}



export default function SortableItem(props:any) {
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
      <Item id={props.id} />
    </div>
  );
}
