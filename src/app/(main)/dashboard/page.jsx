"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DisplayImage from "@/components/ui/display-image";
import { useState } from "react";
import { storeUser } from "@/hooks/state";
import PostModal from "@/components/layout/modal/post";
import UserPost from "@/components/layout/Dashboard/post";

export default function Page() {
  const user = storeUser((state) => state.user);

  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main className="flex flex-col items-center gap-2">
      <PostModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      />

      <section className="w-full flex items-center justify-center rounded-lg gap-2 bg-white px-2 py-3">
        <DisplayImage img="/finn.jpg" />
        <Button 
        onClick={() => setIsOpen(isOpen => !isOpen)}
        className="bg-white text-gray-500 font-normal gray-bg w-[80%] flex justify-start py-5 active:scale-98 transition-transform"
        >
           What's on your mind {user.firstname}? 
        </Button>
      </section>

      <UserPost />
      <UserPost />
      <UserPost />
    </main>
  );
}
