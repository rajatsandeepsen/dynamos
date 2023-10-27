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

    // addState: (news: string) => void
}

export const useTeamStore = create<StoreTeam>((set) => ({
    team: [],
    addTeam: (team) => set((state) => ({ team: [ ...state.team, team ] })),
    removeTeam: (id) => set((state) => ({ team: state.team.filter((team) => team.id !== id) })),

    // addState: (news) => set(state => ({...state, news}))
    

}))
  

