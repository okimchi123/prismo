"use client";
import { ChevronLeft, Image } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { storeUser } from "@/hooks/state";
import { Textarea } from "@/components/ui/textarea";
import NextImage from "next/image";
import clsx from "clsx";
import { handlePostSubmit } from "@/services/post.service";

export default function PostModal({ isOpen, onClose }) {
  const disabledBtn = "bg-gray-400";
  const user = storeUser((state) => state.user);
  const [postMessage, setPostMessage] = useState("");
  const handlePost = async (e) => {
    e.preventDefault();
    if (!postMessage.trim()) return;
    handlePostSubmit(postMessage, user);
  };

  return (
    isOpen && (
      <main className="absolute w-full top-0 right-0 h-screen z-100 flex justify-center items-start bg-white">
        <form
          onSubmit={handlePost}
          className="flex flex-col w-full justify-start"
        >
          <section className="flex items-center p-2 justify-between border-b-1">
            <div className="flex items-center gap-4">
              <ChevronLeft className="cursor-pointer" onClick={onClose} />
              <h1>Create post</h1>
            </div>
            <Button
              type="submit"
              disabled={!postMessage}
              className={clsx(disabledBtn, {
                "bg-pink-400 hover:bg-pink-500": postMessage,
              })}
            >
              POST
            </Button>
          </section>
          <section className="px-3 py-2 flex flex-col">
            <div className="flex gap-2 mb-2">
              <figure className="w-12 h-12 relative">
                <NextImage
                  src="/finn.jpg"
                  fill
                  alt="profile_pic"
                  className="object-cover rounded-md"
                />
              </figure>
              <span className="text-[14px] font-semibold text-black">
                {user.firstname} {user.lastname}
              </span>
            </div>
            <Textarea
              value={postMessage}
              onChange={(e) => {
                setPostMessage(e.target.value);
              }}
              className="mb-3"
              placeholder="What's on your mind?"
            />
            <div className="flex items-center gap-1 text-md prismo">
              <Image size="22" />
              <span>Photos|Videos</span>
            </div>
          </section>
        </form>
      </main>
    )
  );
}
