'use client'
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore" 
import { db } from "@/lib/firebase"
import { useState, useEffect } from "react";

export async function addComment(postID, commentData, userID, userName, setLoading){
    const commentRef = collection(db, "posts", postID, "comments");
    try {
        await addDoc(commentRef, {
        userID,
        userName,
        commentData,
        createdAt: Timestamp.now(),
    })
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
}

export function getComment(postID){
    const [comment, setComment] = useState([]);

    useEffect(()=>{
        if(!postID) return;

        const commentRef = collection(db, "posts", postID, "comments");
        const q = query(commentRef, orderBy("createdAt", "desc"))

        const unsubscribe = onSnapshot(q, (snapshot) =>{
            const data = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }))
            setComment(data)
        })
        return () => unsubscribe();
     },[postID])

     return comment;
}