export const zFilter = <T={}>(state:Object, array: string[] & Array<T>) => {
    const x = Object.keys(state).filter(e => !array.includes(e))


      const y = {} as {unassigned:string[], [key:string]:string[]}
      x.forEach((e) => {
        y[e as keyof typeof y] = state[e as keyof typeof state] as any
      })

      return y
}