import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default async function AddFriend(userID, addedUserID){
    const docRef = collection(db, "friend_requests");
    try{
        await addDoc(docRef, {
            userID,
            addedUserID,
            status: "pending",
            createdAt: Timestamp.now(),
        })
        console.log("successsss")
    }catch(error){
        console.error("Error adding friend request: ", error);
    }
}
