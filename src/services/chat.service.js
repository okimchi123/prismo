'use client'
import {
  doc,
  setDoc,
  collection,
  addDoc,
  Timestamp,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
function generateChatId(uid1, uid2) {
  return uid1 > uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
}

export async function sendMessage(senderId, receiverId, text) {
  const chatId = generateChatId(senderId, receiverId);
  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      participants: [senderId, receiverId],
      createdAt: Timestamp.now(),
    });
  }

  await addDoc(collection(chatRef, "messages"), {
    senderId,
    text,
    timestamp: Timestamp.now(),
  });
}

export function useChatMessages(currentUserId, chatUserId) {
  const [messages, setMessages] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(true);

  useEffect(() => {
    if (!currentUserId || !chatUserId) return;

    const chatId = generateChatId(currentUserId, chatUserId);
    const messagesRef = collection(db, "chats", chatId, "messages");

    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setLoadingMessage(false);
    });

    return () => unsubscribe();
  }, [currentUserId, chatUserId]);

  return { messages, loadingMessage };
}
