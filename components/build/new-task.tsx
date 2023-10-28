import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react"

export function NewTask({setTask}:{setTask:(task:string)=>void}) {
    const [title, setTitle] = useState("")

    const confirmTask = () => {
        setTask(title)
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create new Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card">
        <DialogHeader>
          <DialogTitle>Create new Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={confirmTask}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
