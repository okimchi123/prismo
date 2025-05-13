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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

export function useAuthRedirect(page) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && page === "login") {
        router.replace("/dashboard");
      } else if (!user && page === "dashboard") {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return loading;
}

export function listenToUserProfile(onSuccess, onError) {
  const unsubscribeAuthState = auth.onAuthStateChanged((user) => {
    if (!user) {
      onError?.("User not authenticated");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onSuccess(docSnap.data());
        } else {
          onError?.("User document does not exist");
        }
      },
      (error) => {
        console.error("Failed to listen to user profile:", error);
        onError?.(error.message);
      }
    );

    return unsubscribe;
  });

  return () => unsubscribeAuthState();
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
