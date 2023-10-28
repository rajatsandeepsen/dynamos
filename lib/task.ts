import { create } from 'zustand'
import { zFilter } from './zustand'



type Store = {
    task: Task[]

    addTask: (task: Task) => void
    removeTask: (id: string) => void
}

export const useTaskStore = create<Store>((set) => ({
    task: [],
    addTask: (task) => set((state) => ({ task: [ ...state.task, task ] })),
    removeTask: (id) => set((state) => ({ task: state.task.filter((task) => task.id !== id) })),

}))
  


type StoreTeam = {
    team: TeamMember[]

    addTeam: (team: TeamMember) => void
    removeTeam: (id: string) => void
    promoteTeam: (id:string, data:TeamMember) => void
}

export const useTeamStore = create<StoreTeam>((set) => ({
    team: [],
    addTeam: (team) => set((state) => ({ team: [ ...state.team, team ] })),
    removeTeam: (id) => set((state) => ({ team: state.team.filter((team) => team.id !== id) })),
    
    promoteTeam: (id, data) => set((state) => ({ team: state.team.map((team) => team.id === id ? {...team, ...data} : team) })),

}))

type Ommited = Omit<StoreWhole, "collection"| "useState"| "addState"| "removeState" | "getAllStates">
type StoreWhole = {
    collection: string[]
    dam: {
        unassigned: string[]
        [key: string]: string[]
    }
    useState: React.Dispatch<React.SetStateAction<StoreWhole["dam"]>>
    addState: (news: string) => void
    removeState: (id: string) => void
}

export type TeamWholeKeys = keyof StoreWhole


export const useTeamState = create<StoreWhole>((set, get, state) => ({
    collection: [],
    dam: {
        unassigned: []
    },
    
    useState: (props) => {
        if (typeof props === "object" ){
            set((state) => ({ ...state, dam: props }))
        }
        else if (typeof props === "function") {
            set((state) => {
                const x:StoreWhole["dam"] = props(state.dam)
                return {...state, dam:x }
            })
        }
        
    },
    
    addState: (news) => {
        set(state => {
            
                const x = {...state,
                    collection: [...state.collection, news],
                    dam: {
                        ...state.dam, [news]: []
                    }
                }

                return x
            } 
        )
    },

    removeState: (id) => set((state) => {
        delete state.dam[id]
        const x = {...state, 
            dam: {
                ...state.dam
            },
            collection: state.collection.filter((news) => news !== id)
        }
        return (x)
    })

}))
  

