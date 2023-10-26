"use client"

import React, { useState } from "react";
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
  UniqueIdentifier,
  DragEndEvent
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "./self-container";
import { Item } from "./self-items";

type Content = string

type Items = {
  backlog: Content[],
  todo: Content[],
  inProgress: Content[],
  done: Content[],
}


const defaultAnnouncements = {
  onDragStart(id:DragStartEvent) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id:string, overId:string) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id:string, overId:string) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id:string) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  }
};

export default function Self() {
  const [items, setItems] = useState({
    backlog: [],
    todo: ["1", "2", "3"],
    inProgress: ["4", "5", "6"],
    done: ["7", "8", "9"],
  });
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
      <DndContext
        accessibility={{announcements:defaultAnnouncements} as any}
        
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="backlog" items={items.backlog} />
        <Container id="todo" items={items.todo} />
        <Container id="inProgress" items={items.inProgress} />
        <Container id="done" items={items.done} />
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
  );

  function findContainer(id:string) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key as keyof typeof items].includes(id as never));
  }

  function handleDragStart(event:DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event:DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as {id:string};

    // Find the containers
    const activeContainer = findContainer(id as string);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer as keyof Items];
      const overItems = prev[overContainer as keyof Items];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id as never);
      const overIndex = overItems.indexOf(overId as never);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 && true
          // draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer as keyof Items].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer as keyof Items].slice(0, newIndex),
          items[activeContainer as keyof Items][activeIndex],
          ...prev[overContainer as keyof Items].slice(newIndex, prev[overContainer as keyof Items].length)
        ]
      };
    });
  }

  function handleDragEnd(event:DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as {id:string};

    const activeContainer = findContainer(id as string);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer as keyof Items].indexOf(active.id as never);
    const overIndex = items[overContainer as keyof Items].indexOf(overId as never);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer as keyof Items], activeIndex, overIndex)
      }));
    }

    setActiveId(null);
  }
}
