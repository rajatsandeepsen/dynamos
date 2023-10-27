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
import { useTeamStore } from "@/lib/task";
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

export function AllTeam() {
  const [team, addMember] = useTeamStore((state) => [
    state.team,
    state.addTeam,
  ]);

  const newMember = (name:string) => {
    addMember( { id: cuid(), name, tasks: [] })
  };
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>All team</CardTitle>
        <CardDescription>Total {team.length} members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {team.map((e) => (
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Olivia Martin
                </p>
                <p className="text-sm text-muted-foreground">
                  olivia.martin@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$1,999.00</div>
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