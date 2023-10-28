"use client"

function get<T>(key: string): (T | undefined) {


        const item = localStorage.getItem(key)
        const result = item ? JSON.parse(item) as T : undefined
        return result
}

function set<T>(key: string, value: T | undefined | null) {


        if ( value === null || value === undefined )
        localStorage.removeItem(key)
        else 
        localStorage.setItem(key, JSON.stringify(value))  
}

function update<T>(key: string, value: Partial<T>) {
    const data = get<T>(key)
    if (data) {
        const updatedData = { ...data, ...value }
        set(key, updatedData)
    }
    else set(key, value)
}
const local = { get, set, update }

export default local