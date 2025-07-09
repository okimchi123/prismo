import {doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '@/lib/firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export default async function ChangePic( file, userID){
    if(!file) return;
    const storageRef = ref(storage, `profile_pics/${userID}`)
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef)

    const userRef = doc(db, 'users', user)
    await updateDoc(userRef,{
        dpURL: downloadURL,
    })
    return downloadURL;
}