"use client";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { fetchAFriend } from "./Friend";
import { userFriends } from "./state";

export function GetUserFriends(userID) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allFriends, setAllFriends] = useState([]);
  const setFriendGlobalState = userFriends((state)=>state.setFriend)

  useEffect(() => {
    if (!userID) return;

    const userRef = collection(db, "users", userID, "friends");

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      const fetchedFriends = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setFriends(fetchedFriends);
    });

    return () => unsubscribe();
  }, [userID]);

  useEffect(() => {
    async function getAllFriends() {
      const profiles = await Promise.all(
        friends.map((data) => fetchAFriend(data.uid))
      );
      setAllFriends(profiles)
      setLoading(false);
      setFriendGlobalState(profiles);
    }
    if(friends){
        getAllFriends();
    }
  }, [friends]);

  return { allFriends, loading };
}
