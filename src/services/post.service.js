import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { db

 } from '@/lib/firebase'

export async function handlePostSubmit(postMessage, user){
    
    try {
        const docRef = await addDoc(collection(db, 'posts'),
        {
            text: postMessage,
            userId: user.uid,
            userName: `${user.firstname} ${user.lastname}`,
            userUsername: user.username,
            createdAt: Timestamp.now(),
        }
    );
    console.log("Created with id:", docRef.id)
    } catch (error) {
        console.error(error)
    }
}