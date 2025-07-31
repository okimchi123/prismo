import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getAllUsers(){
    const querySnapshot = await getDocs(collection(db, 'users'));
    const data = querySnapshot.docs.map(doc => ({
    uid: doc.id,          
    ...doc.data()        
  }));
    return data
}