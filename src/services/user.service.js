import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function listenToUserProfile(onSuccess, onError) {
  const unsubscribeAuthState = auth.onAuthStateChanged((user) => {
    if (!user) {
      onError?.("User not authenticated");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        onSuccess(docSnap.data());
      } else {
        onError?.("User document does not exist");
      }
    }, (error) => {
      console.error("Failed to listen to user profile:", error);
      onError?.(error.message);
    });

    return unsubscribe;
  });

  return () => unsubscribeAuthState();
}

export async function logout(){
  try {
    await auth.signOut();
  } catch (error) {
    toast.error("Logout failed. Please try again.");
    console.error("Logout error: ", error);
  }
}