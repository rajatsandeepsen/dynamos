"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TeamWholeKeys, useTeamState, useTeamStore } from "@/lib/task";
import cuid from "cuid";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import React, { useState } from "react";
import { zFilter } from "@/lib/zustand";
import { PersonIcon, TrashIcon } from "@radix-ui/react-icons";

export function AllTeam() {
  const [teamData, addMember, removeMember] = useTeamStore((state) => [
    state.team,
    state.addTeam,
    state.removeTeam
  ]);
  
  const [addState, teamTask, removeState] = useTeamState(state => [state.addState, 
      zFilter<TeamWholeKeys>(state, ["collection", "useState", "addState", "removeState"]),
      state.removeState
    ])

  const newMember = (name:string) => {
    const id = cuid()
    addMember( { id, name, tasks: [] })
    addState(id)
  };

  const deleteMember = (id:string) => {

    if (teamTask[id].length === 0) {
      removeMember(id)
      removeState(id)
    } 

    else {
      alert("Member has tasks assigned")
    }

  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>All team</CardTitle>
        <CardDescription>Total {teamData.length} members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {teamData.map((e) => (
            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-center">

              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>
                  <PersonIcon/>
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-semibold">
                  {e.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {e.id}
                </p>
              </div>
              </div>
              <div className="font-medium">{teamTask[e.id].length}x tasks</div>
              <Button variant={"destructive"} className="rounded-full w-10 p-0" onClick={()=>deleteMember(e.id)}><TrashIcon/></Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
      <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full">Add Member</Button>
          </DialogTrigger>
          <AddMember run={newMember}/>
      </Dialog>
      </CardFooter>
    </Card>
  );
}

const AddMember = ({run}:{run:(name:string)=>void}) => {
  const [name, setName] = useState("")
  return ( 
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={()=> run(name)}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
   );
}
 
export default AddMember;