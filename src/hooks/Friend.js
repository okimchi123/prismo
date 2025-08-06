import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, where, getDocs, getDoc, query, doc } from "firebase/firestore";

export async function AddFriend(userID, addedUserID) {
    const docRef = collection(db, "friend_requests");
    try {
        await addDoc(docRef, {
            userID,
            addedUserID,
            status: "pending",
            createdAt: Timestamp.now(),
        })
        console.log("successsss")
    } catch (error) {
        console.error("Error adding friend request: ", error);
    }
}

export async function fetchPendingRequests(addedUserID) {
    const q = query(
        collection(db, "friend_requests"),
        where("addedUserID", "==", addedUserID),
        where("status", "==", "pending")
    );
    try {
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error(error)
    }
}

export async function fetchSenderUser(userID){
    const userDoc = await getDoc(doc(db, "users", userID));
    return userDoc.exists() ? { userID, ...userDoc.data() } : null;
}