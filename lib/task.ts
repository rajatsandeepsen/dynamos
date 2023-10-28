import { create } from 'zustand'



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


type StoreWhole = {
    collection: string[]
    unassigned: string[]
    useState: React.Dispatch<React.SetStateAction<EachMember>>
    addState: (news: string) => void
    removeState: (id: string) => void
}

export type TeamWholeKeys = keyof StoreWhole


export const useTeamState = create<StoreWhole>((set) => ({
    unassigned: [],
    collection: [],
    
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
    
    addState: (news) => {
        set(state => {
            
                const x = {...state,
                    collection: [...state.collection, news],
                    [news]: []
                }

                return x
            } 
        )
    },

    removeState: (id) => set((state) => {
        const x = {...state, 
            [id]: undefined, 
            collection: state.collection.filter((news) => news !== id)
        }
        return (x)
    })

}))
  

