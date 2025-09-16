import Image from "next/image"
import { useState } from "react"
import {doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore"
import { db } from "@/lib/firebase";

export function LikeButton({postId, userId, currentLikes}){
    const [likes, setLikes] = useState(currentLikes);

    const hasLiked = likes.includes(userId)
    const toggleLike = async () => {
        const postRef = doc(db, "posts", postId)
        const feedRef = doc(db, "users", userId, "feed", postId)
        try {
            if(hasLiked){
                await updateDoc(postRef, {
                    likes: arrayRemove(userId),
                })
                await updateDoc(feedRef, {
                    likes: arrayRemove(userId),
                })
                setLikes(likes.filter((id)=> id !== userId))
            }else{
                await updateDoc(postRef, {
                    likes: arrayUnion(userId),
                })
                await updateDoc(feedRef, {
                    likes: arrayUnion(userId),
                })
                setLikes([...likes, userId])
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="flex flex-col items-center">
            <button onClick={toggleLike} className="cursor-pointer">
                {hasLiked ? <Image src="/post/liked.svg" height="35" width="35" alt="liked" /> : <Image src="/post/like.svg" height="35" width="35" alt="like" />}
            </button>
            <p className="text-xs mr-2">{likes.length}</p>
        </div>
    )
}