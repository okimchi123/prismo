import { create } from "zustand";

export const storeUser = create((set)=>({
    user: {},
    setUser: (data) => set({user:data}),
}))

export const selectedUser = create((set)=>({
    user:{},
    setUser: (data) => set({user:data}),
}))