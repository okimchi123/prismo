import { create } from "zustand";

export const storeUser = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  clearUser: () => set({ user: null, loading: true }),
}));

export const userFriends = create((set)=>({
    friend:[],
    setFriend: (data) => set({friend:data}),
}))