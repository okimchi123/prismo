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

export function listenToAllPosts(userID, setPosts) {
  const feedRef = collection(db, "users", userID, "feed");

  const q = query(feedRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      postID: doc.id,
      ...doc.data(),
    }));

    setPosts(data);
  });

  return unsubscribe;
}