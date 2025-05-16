"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { registerUser } from "@/services/user.service";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import Loading from "@/components/Loading";

export default function Page() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(userData);
      setUserData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        username: "",
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loadingAuth = useAuthRedirect("login");
  if (loadingAuth) return <Loading />;

  return (
    <main className="flex flex-col items-center w-full h-screen gap-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-[10%] sm:mt-[8%] md:mt-[5%] select-none rounded-xl flex flex-col items-center gap-3 p-5"
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
