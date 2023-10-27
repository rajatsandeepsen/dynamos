type Progress = "todo" | "inProgress" | "done" | "backlog"

type Task = {
    text: string
    progress: Progress
    id: string
    createdAt: string
    assigned: "unassigned" | string
}

type TeamMember = {
    id: string
    name: string
    tasks: Task[]
}

type Content = string

type EachMember = {
  [k:string]: Content[]
}
