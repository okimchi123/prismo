"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "sonner";
import {
  setDoc,
  doc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";

export default function Page() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", userData.username)
    );
    const querySnapshot = await getDocs(usernameQuery);

    if (!querySnapshot.empty) {
      toast.error("Username already taken.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
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

      setUserData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        username: "",
      });
    } catch (err) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use.");
      } else {
        toast.error("Something went wrong.");
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <main className="flex flex-col items-center w-full h-screen gap-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-[5%] select-none rounded-xl flex flex-col items-center gap-3 p-5"
      >
        <h1 className="text-[22px] mb-2">Register Now</h1>
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          onChange={handleChange}
          type="text"
          name="firstname"
          placeholder="First Name"
          value={userData.firstname}
          required
        />
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          type="text"
          onChange={handleChange}
          name="lastname"
          placeholder="Last Name"
          value={userData.lastname}
          required
        />
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="Email"
          value={userData.email}
          required
        />
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          type="text"
          onChange={handleChange}
          name="username"
          placeholder="Username"
          value={userData.username}
          required
        />
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
          value={userData.password}
          required
        />
        <Button className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      <Link href="/" className={`${buttonVariants({ variant: "outline" })}`}>
        Go to Login
      </Link>
    </main>
  );
}
