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
  DragEndEvent,
  UniqueIdentifier
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Container from "./team-container";
import { Item } from "./team-items";

type Content = string

type Items = {
  [k in any]: Content[]
}


const defaultAnnouncements = {
  onDragStart(id:string) {
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

export default function Team() {
  const [items, setItems] = useState<Items>({
    root: ["1", "2", "3"],
    container1: ["4", "5", "6"],
    container2: ["7", "8", "9"],
    container3: [],
    container4: []
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
        accessibility={{announcements:defaultAnnouncements} as  any}
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="root" items={items.root} />
        <Container id="container1" items={items.container1} />
        <Container id="container2" items={items.container2} />
        <Container id="container3" items={items.container3} />
        <Container id="container4" items={items.container4} />
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
  );

  function findContainer(id:string) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key as keyof Items].includes(id as never));
  }

  function handleDragStart(event:DragStartEvent) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event:DragOverEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as {id:string}

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
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id as never);
      const overIndex = overItems.indexOf(overId);

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
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }

  function handleDragEnd(event:DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as {id:string}

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
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }

    setActiveId(null);
  }
}
