'use client'
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { userFriends } from "./state";

export function useUserPosts(userId){
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if (!userId) return;

        const postRef = collection(db, "posts")
        const q = query(postRef, where("userId", "==", userId), orderBy("createdAt", "desc"))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            setPosts(fetchedPosts)
            setLoading(false)
        })

        return () => unsubscribe()
    },[userId])

    return {posts, loading};
}

export function getAllPosts(userID) {
  const [allUsers, setAllUsers] = useState([]);
  const friends = userFriends((state) => state.friend);

  useEffect(() => {
    if (!userID) return;

    const friendIds = friends.map((friend) => ({ uid: friend.uid }));
    setAllUsers([{ uid: userID }, ...friendIds]);
  }, [userID, friends]);

  return allUsers;
}