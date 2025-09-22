import {
  collection,
  addDoc,
  Timestamp,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

export async function handlePostSubmit(postMessage, user, friends, gif) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL ? user.dpUrl : null,
      postMedia: gif ? gif : null, 
      userLocalPic: user.localPic ? userLocalPic : null,
      createdAt: Timestamp.now(),
    });

    const feedPost = {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL ? user.dpUrl : null,
      postMedia: gif ? gif : null,
      userLocalPic: user.localPic ? userLocalPic : null,
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

export async function handlePostSubmitWithFile(
  postMessage,
  user,
  friends,
  file
) {
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
      userDP: user.dpURL ? user.dpUrl : null,
      postMedia: downloadURL,
      userLocalPic: user.localPic ? userLocalPic : null,
      createdAt: Timestamp.now(),
    });

    const feedPost = {
      text: postMessage,
      userId: user.uid,
      userName: `${user.firstname} ${user.lastname}`,
      userUsername: user.username,
      userDP: user.dpURL ? user.dpUrl : null,
      postMedia: downloadURL,
      userLocalPic: user.localPic ? userLocalPic : null,
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

export async function editPost(userID, postID, postText, friends) {
  const feedRef = doc(db, "users", userID, "feed", postID);
  const postRef = doc(db, "posts", postID);

  try {
    await updateDoc(feedRef, { text: postText });
    await updateDoc(postRef, { text: postText });

    const writePromises = [
      ...friends.map((friend) =>
        updateDoc(doc(db, "users", friend.uid, "feed", postID), {
          text: postText,
        })
      ),
    ];

    await Promise.all(writePromises);
  } catch (error) {
    console.error(error);
  } finally {
    toast.success("Updated Post");
  }
}
export async function deletePostHook(userID, postID, friends) {
  const feedRef = doc(db, "users", userID, "feed", postID);
  const postRef = doc(db, "posts", postID);

  try {
    await deleteDoc(feedRef);
    await deleteDoc(postRef);

    const writePromises = [
      ...friends.map((friend) =>
        deleteDoc(doc(db, "users", friend.uid, "feed", postID))
      ),
    ];

    await Promise.all(writePromises);
  } catch (error) {
    console.error(error);
  } finally {
    toast.success("Deleted Post");
  }
}
