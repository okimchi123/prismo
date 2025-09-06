'use client'
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
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

export async function getAllPosts(userID){
    //update this hook make it a real snapshot
    const querySnapshot = await getDocs(collection(db, 'users', userID, 'feed'));
    const data = querySnapshot.docs.map(doc => ({
    postID: doc.id,          
    ...doc.data()        
  }));
    return data
}