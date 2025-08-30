import { db } from "@/lib/firebase";
import { collection, addDoc, setDoc, deleteDoc, updateDoc, Timestamp, where, getDocs, getDoc, query, doc } from "firebase/firestore";
import { toast } from "sonner";

export async function AddFriend(userID, addedUserID) {
    const docRef = collection(db, "friend_requests");
    try {
        await addDoc(docRef, {
            userID,
            addedUserID,
            status: "pending",
            createdAt: Timestamp.now(),
        })
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
        return snapshot.docs.map(doc => ({id:doc.id , ...doc.data()}));
    } catch (error) {
        console.error(error)
    }
}

export async function getUserAdds(uid, addedUserID){
    const q = query(
        collection(db, "friend_requests"),
        where("addedUserID", "==", addedUserID),
        where("status", "==", "pending"),
        where("userID", "==", uid)
    )
    try {
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error(error)
    }
}

export async function fetchSenderUser(userID, reqID){
    const userDoc = await getDoc(doc(db, "users", userID));
    return userDoc.exists() ? { uid:userID, reqID, ...userDoc.data() } : null;
}

export async function AcceptRequest(fromID, toID, reqID){
    const docRef = doc(db, "friend_requests", reqID);
    const receiverRef = doc(db, "users", toID, "friends", fromID)
    const senderRef = doc(db, "users", fromID, "friends", toID)
    toast.success("Accepted")
    try {
        await updateDoc(docRef,{
            status:"accepted",
        })
        await setDoc(receiverRef, {
            uid:fromID,
            createdAt: new Date(),
        })
        await setDoc(senderRef,{
            uid:toID,
            createdAt: new Date(),
        })
    } catch (error) {
        console.error(error)
    } 
}

export async function RemoveFriend(fromID, toID){
    const receiverRef = doc(db, "users", toID, "friends", fromID)
    const senderRef = doc(db, "users", fromID, "friends", toID)
    await deleteDoc(receiverRef)
    await deleteDoc(senderRef)
}

export async function RejectRequest(reqID){
    try {
        await deleteDoc(doc(db, "friend_requests", reqID))
        toast.success("Rejected")
    } catch (error) {
        console.error(error)
    }
}

export async function fetchAFriend(userID){
    const userDoc = await getDoc(doc(db, "users", userID));
    return userDoc.exists() ? { uid:userID, ...userDoc.data() } : null;
}