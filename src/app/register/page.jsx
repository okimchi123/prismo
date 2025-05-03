"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { register } from "@/services/auth";

export default function Page() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(userData);
      console.log(userData);
      alert("successful!");
      setUserData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
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
        <div className="w-full relative">
          <input
            className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
            type="password"
            onChange={handleChange}
            name="password"
            placeholder="Password"
            value={userData.password}
            required
          />
        </div>
        <Button className="w-full">Submit</Button>
      </form>
      <Link href="/" className={`${buttonVariants({ variant: "outline" })}`}>
        Go to Login
      </Link>
    </main>
  );
}
