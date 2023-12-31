"use client"

import {useMemo} from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "../ui/card";
import { PersonIcon } from "@radix-ui/react-icons";
import { useSelfTaskWhole } from "@/lib/self";
import { Grip } from "lucide-react";
type Props = {
  id: string
}

export function Item(props:Props) {
  const { id } = props;
  const readTask = useSelfTaskWhole(state => state.readTask)

  const item = readTask(id)
  const date = new Date(parseInt(item?.createdAt || "0"))

  // if (item?.progress !== "backlog") return null;

  return (
    <Card className="bg-muted">
        <CardContent className="flex-row justify-between space-y-0 p-4 flex items-start">
            <p className="text-sm font-medium leading-none">{item?.text}</p>
            <p className="text-sm text-muted-foreground">{date.toLocaleDateString('en-IN')}</p>
            <Grip className="text-muted-foreground" size={20} />
        </CardContent>
    </Card>
  );
}



export default function SortableItem(props:{id:string}) {
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
      <Item id={props.id}/>
    </div>
  );
}
