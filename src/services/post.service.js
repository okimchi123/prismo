import {collection, addDoc, Timestamp, setDoc, doc} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function handlePostSubmit(postMessage, user, friends) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL,
      userLocalPic: user.localPic,
      createdAt: Timestamp.now(),
    });

    const feedPost = {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL,
      userLocalPic: user.localPic,
      createdAt: Timestamp.now(),
    };

    const writePromises = [
      setDoc(doc(db, "users", user.uid, "feed", docRef.id), feedPost),
      ...friends.map(friend =>
        setDoc(doc(db, "users", friend.uid, "feed", docRef.id), feedPost)
      )
    ];

    await Promise.all(writePromises);

    console.log("Post created with id:", docRef.id);
  } catch (error) {
    console.error(error);
  }
}
