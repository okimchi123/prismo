"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { storeUser } from "@/hooks/state";
import PostModal from "@/components/layout/modal/post";

export default function Page() {
  const user = storeUser((state) => state.user);

  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main className="flex flex-col items-center">
      <PostModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      />

      <section className="w-full flex items-center justify-center rounded-lg gap-2 bg-white px-2 py-3">
        <figure className="w-10 h-10 relative">
          <Image src="/finn.jpg" fill alt="profile_pic" className="object-cover rounded-md" />
        </figure>
        <Button 
        onClick={() => setIsOpen(isOpen => !isOpen)}
        className="bg-white text-gray-500 font-normal gray-bg w-[80%] flex justify-start py-5 active:scale-98 transition-transform"
        >
           What's on your mind {user.firstname}? 
        </Button>
      </section>

    </main>
  );
}
