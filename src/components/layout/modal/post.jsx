"use client";
import { ChevronLeft, Image } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { storeUser, userFriends } from "@/hooks/state";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import { handlePostSubmit } from "@/services/post.service";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { DisplayImage } from "@/components/ui/display-image";

export default function PostModal({ onClose }) {
  const friends = userFriends((state)=>state.friend)
  const user = storeUser((state) => state.user);
  const [postMessage, setPostMessage] = useState("");
  const handlePost = async (e) => {
    e.preventDefault();
    if (!postMessage.trim()) return;
    handlePostSubmit(postMessage, user, friends);
    toast.success("Post Created");
    setPostMessage("");
    onClose();
  };

  return (
    <motion.main
      exit={{ opacity: 0 }}
      className="absolute w-full md:fixed top-0 right-0 h-screen z-103 flex justify-center items-start md:items-center bg-[#FFA1B3]/30"
    >
      <motion.form
        key="modal"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onSubmit={handlePost}
        className="flex flex-col w-full h-full md:h-[95%] md:w-[400px] rounded-sm bg-white justify-start"
      >
        <section className="flex items-center p-2 justify-between border-b-1">
          <div className="flex items-center gap-4">
            <ChevronLeft className="cursor-pointer" onClick={onClose} />
            <h1>Create post</h1>
          </div>
          <Button
            type="submit"
            disabled={!postMessage}
            className={clsx("select-none", {
              "bg-pink-400 hover:bg-pink-500": postMessage,
            })}
          >
            POST
          </Button>
        </section>
        <section className="px-3 py-2 flex flex-col">
          <div className="flex gap-2 mb-2">
            <DisplayImage
              img={
                user.localPic
                  ? user.localPic
                  : user.dpUrl
                  ? user.dpUrl
                  : "/jake.jpg"
              }
            />
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
            <label htmlFor="postID" className="cursor-pointer" >Photos|Videos</label>
            <input
                id="postID"
                type="file"
                accept="image/*"
                hidden
              />
          </div>
        </section>
      </motion.form>
    </motion.main>
  );
}
