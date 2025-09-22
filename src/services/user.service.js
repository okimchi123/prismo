'use client'
import {
  doc,
  onSnapshot,
  setDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { storeUser } from "@/hooks/state";

export async function registerUser(userData) {
  const usernameQuery = query(
    collection(db, "users"),
    where("username", "==", userData.username)
  );
  const querySnapshot = await getDocs(usernameQuery);

  if (!querySnapshot.empty) {
    toast.error("Username is already used.");
    throw new Error("Username is already used");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      createdAt: new Date(),
    });

    toast.success("Account created successfully!");
    await auth.signOut();
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("Email is already used.");
    } else {
      toast.error("Something went wrong.");
      console.error(error);
    }
    throw error;
  }
}

export function initUserListener() {
  const { setUser, clearUser } = storeUser.getState();

  const unsubscribeAuth = auth.onAuthStateChanged((user) => {
    if (!user) {
      clearUser();
      return;
    }

    const userRef = doc(db, "users", user.uid);

    const unsubscribeProfile = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUser({ uid: user.uid, ...docSnap.data() });
        } else {
          clearUser();
        }
      },
      (error) => {
        console.error("User profile listener error:", error);
        clearUser();
      }
    );

    return unsubscribeProfile;
  });

  return unsubscribeAuth;
}

export async function logout() {
  try {
    await auth.signOut();
    document.cookie = "__session=; path=/; max-age=0";
    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error("Logout failed. Please try again.");
    console.error("Logout error: ", error);
  }
}
