import { create } from "zustand";

export const storeUser = create((set)=>({
    user: {},
    setUser: (data) => set({user:data}),
}))

export const userFriends = create((set)=>({
    friend:[],
    setFriend: (data) => set({friend:data}),
}))