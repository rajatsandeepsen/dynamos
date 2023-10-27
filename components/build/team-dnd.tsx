"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container, { UnAssigned } from "./team-container";
import { Item } from "./team-items";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { NewTask } from "./new-task";
import cuid from "cuid";
import { TeamWholeKeys, useTaskStore, useTeamState, useTeamStore } from "@/lib/task";
import { zFilter } from "@/lib/zustand";

const defaultAnnouncements = {
  onDragStart(id: string) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id: string, overId: string) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id: string, overId: string) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id: string) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

export default function Team() {
  const [setTask] = useTaskStore((state) => [state.addTask]);

  const [items, setItems] = useTeamState((state) => {
    const y = zFilter<TeamWholeKeys>(state, ["collection", "useState", "addState", "removeState"]);

    return [y, state.useState];
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function AddTask(text: string) {
    const id = cuid();
    const x = {
      id,
      createdAt: Date.now().toString(),
      progress: "todo",
      text,
      assigned: "unassigned",
    } as Task;
    setItems((prev) => ({ ...prev, unassigned: [...prev.unassigned, id] }));

    setTask(x);
  }

  return (
    <DndContext
      accessibility={{ announcements: defaultAnnouncements } as any}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="break-inside-avoid">
        <Card className="mb-5 break-inside-avoid">
          <CardHeader>Unassigned Tasks</CardHeader>
          <UnAssigned id={"unassigned"} items={items.unassigned} />
          <CardFooter>
            <NewTask setTask={AddTask as any} />
          </CardFooter>
        </Card>
      </div>

      {Object.entries(items).map(([key, value]) => {
        if (key === "unassigned") return null;
        return <Container id={key} items={value} />;
      })}

      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );

  function findContainer(id: keyof EachMember) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key as keyof EachMember].includes(id as never)
    );
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const { id } = active as { id: string };
    const { id: overId } = over as { id: string };

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id as never);
      const overIndex = overItems.indexOf(overId as any);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over && overIndex === overItems.length - 1 && true;
        // draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as { id: string };

    const activeContainer = findContainer(id as string);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id as never);
    const overIndex = items[overContainer].indexOf(overId as never);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveId(null);
  }
}
