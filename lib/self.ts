import { create } from 'zustand'

type Store = {
    todo:Task[],
    inProgress:Task[],
    done:Task[],
    backlog: Task[],

    justRead: () => {
        [k in keyof Omit<Store, "justRead" | "moveTask">]: string[]
    }

    moveTask: (taskID: Task["id"], before: Progress, after:Progress) => void
}

export const useSelfTaskStore = create<Store>((set, get) => ({
    todo: [
        
    ],
    inProgress: [],
    done: [],
    backlog: [],

    justRead: () => ({
        backlog: get().backlog.map((task) => task.id),
        todo: get().todo.map((task) => task.id),
        inProgress: get().inProgress.map((task) => task.id),
        done: get().done.map((task) => task.id)
    }),

    moveTask: (taskID, before, after) => set((state) => {
        const x = state[before].findIndex((task) => task.id === taskID)
        const task = {
            ...state[before][x],
            progess: after
        }
        const newState = {
            ...state,
            [before]: state[before].slice(0, x).concat(state[before].slice(x + 1)),
            [after]: [...state[after], task]
        }

        return newState
    })
}))

export type StoreWhole = {
    tasks: Task[]

    todo:string[],
    inProgress:string[],
    done:string[],
    backlog: string[],

    selfID: string

    justRead: () => {
        [k in Progress]: string[]
    }
    useState: React.Dispatch<React.SetStateAction<{[key in Progress]:string[]}>>

    readTask: (id:string) => Task | undefined

    addTask: (task: Task) => void
    removeTask: (taskID: Task["id"]) => void
    updateTask: (taskID: Task["id"], progess: Progress) => void
}

export const useSelfTaskWhole = create<StoreWhole>((set, get) => ({
    tasks: [ ],

    todo:[],
    inProgress:[],
    done:[],
    backlog:[],

    justRead: () => ({
        backlog: get().backlog,
        todo: get().todo,
        inProgress: get().inProgress,
        done: get().done,
    }),

    useState: (props) => {
        if (typeof props === "object" ){
            set((state) => ({ ...state, props }))
        }
        else if (typeof props === "function") {
            set((state) => {
                const x = props(state as any)
                return {...state,...x }
            })
        }
        
    },

    selfID: "1",

    readTask: (id) => get().tasks.find((task) => task.id === id),

    addTask: (task) => set((state) => ({
        ...state,
        todo: [...state.todo, task.id],
        tasks: [...state.tasks, task]
    })),

    removeTask: (taskID) => set((state) => ({
        ...state,
        tasks: state.tasks.filter((task) => task.id !== taskID)
    })),

    updateTask: (taskID, progress) => set((state) => ({
        ...state,
        tasks: state.tasks.map((task) => task.id === taskID ? {...task, progress} : task)
    }))
}))