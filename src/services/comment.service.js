"use client";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState, useEffect } from "react";

export async function addComment(
  postID,
  commentData,
  user,
  setLoading
) {
  const commentRef = collection(db, "posts", postID, "comments");
  try {
    await addDoc(commentRef, {
      userID: user.uid,
      userName: user.username,
      commentData,
      userDP: user.dpURL ? user.dpURL : null,
      userLocalPic: user.localPic ? user.localPic : null,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}

export function useComment(postID) {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    if (!postID) return;

    const commentRef = collection(db, "posts", postID, "comments");
    const q = query(commentRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComment(data);
    });
    return () => unsubscribe();
  }, [postID]);

  return comment;
}
