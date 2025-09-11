import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function handlePostSubmit(postMessage, user, friends, gif) {
  try {

    const docRef = await addDoc(collection(db, "posts"), {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL,
      postMedia: `${gif ? gif : null}`,
      userLocalPic: user.localPic,
      createdAt: Timestamp.now(),
    });

    const feedPost = {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL,
      postMedia: `${gif ? gif : null}`,
      userLocalPic: user.localPic,
      createdAt: Timestamp.now(),
    };

    const writePromises = [
      setDoc(doc(db, "users", user.uid, "feed", docRef.id), feedPost),
      ...friends.map((friend) =>
        setDoc(doc(db, "users", friend.uid, "feed", docRef.id), feedPost)
      ),
    ];

    await Promise.all(writePromises);

  } catch (error) {
    console.error(error);
  }
}

export async function handlePostSubmitWithFile(postMessage, user, friends, file) {
  try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "post_pic_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dw8mhxm3l/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("failed to upload image");

      const data = await res.json();
      const downloadURL = data.secure_url;

      
    const docRef = await addDoc(collection(db, "posts"), {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL,
      postMedia: downloadURL,
      userLocalPic: user.localPic,
      createdAt: Timestamp.now(),
    });

    const feedPost = {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL,
      postMedia: downloadURL,
      userLocalPic: user.localPic,
      createdAt: Timestamp.now(),
    };

    const writePromises = [
      setDoc(doc(db, "users", user.uid, "feed", docRef.id), feedPost),
      ...friends.map((friend) =>
        setDoc(doc(db, "users", friend.uid, "feed", docRef.id), feedPost)
      ),
    ];

    await Promise.all(writePromises);

  } catch (error) {
    console.error(error);
  }
}