import {doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default async function ChangePic( file, userID){
    if(!file) return;

    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "profile_pic_upload")

    const res = await fetch('https://api.cloudinary.com/v1_1/dw8mhxm3l/image/upload',{
        method:"POST",
        body:formData,
    });

    if(!res.ok) throw new Error("failed to upload image");

    const data = await res.json()
    const downloadURL = data.secure_url;

    const userRef = doc(db, 'users', userID)
    await updateDoc(userRef,{
        dpURL: downloadURL,
    })

    return downloadURL;
}