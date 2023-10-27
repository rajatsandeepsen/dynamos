// import { create } from 'zustand'



// type Store = {
//     team: TeamMember[]
//     addMember: (name: string) => void
//     removeMember: (id: string) => void

//     addTask: (memberId: string, task: Task) => void
//     removeTask: (memberId: string, taskId: string) => void
//     moveTask: (memberId: string, taskId: string, to: keyof Progress) => void
// }

// const useStore = create<Store>()((set) => ({
//     team: [],
//     addMember: (name) =>
//       set((state) => ({
//         team: [...state.team, { id: Date.now().toString(), name, tasks: {} }],
//       })),
    
//     removeMember: (id) =>  set((state) => ({ team: state.team.filter((member) => member.id !== id) })),

//     addTask: (memberId, task) =>
//       set((state) => ({
//         team: state.team.map((member) =>
//           member.id !== memberId
//             ? member
//             : { ...member, tasks: {...member.tasks, [task.id]: task} }
//         ),
//       })),

//     removeTask: (memberId, taskId) => set((state) => ({
//         team: state.team.map((member) =>
//           member.id !== memberId
//             ? member
//             : { ...member, tasks: Object.fromEntries(Object.entries(member.tasks).filter(([key, value]) => key !== taskId)) }
//         ),
//       })),

//     moveTask: (memberId, taskId, to) => set((state) => ({
//         team: state.team.map((member) =>
//           member.id !== memberId
//             ? member
//             : {
//                 ...member,
//                 tasks: Object.fromEntries(Object.entries(member.tasks).map(([key, value]) =>
//                   key !== taskId ? [key, value] : [key, { ...value, done: to }]
//                 )),
//               }
//         ),
//       })),

      
// }))
    