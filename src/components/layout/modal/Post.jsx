"use client";
import { ChevronLeft, Image, Trash, ImagePlay } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { storeUser, userFriends } from "@/hooks/state";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";
import { handlePostSubmit, handlePostSubmitWithFile } from "@/services/post.service";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { DisplayImage } from "@/components/ui/display-image";
import NextImage from "next/image";
import GifSearch from "./Gif";

export default function PostModal({ onClose }) {
  const [gifModal, setGifModal] = useState(false);
  const [file, setFile] = useState(null);
  const [gif, setGif] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const friends = userFriends((state) => state.friend);
  const user = storeUser((state) => state.user);
  const [postMessage, setPostMessage] = useState("");
  const [picHover, setPicHover] = useState(false);
  const gifButtonRef = useRef(null);

  const handleChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
    setPreviewPic(URL.createObjectURL(newFile));
  };

  const removePic = () => {
    setFile(null);
    setGif(null)
    setPreviewPic(null);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!postMessage.trim()) return;
    if(file){
      handlePostSubmitWithFile(postMessage, user, friends, file)
    }else{
      handlePostSubmit(postMessage, user, friends, gif);
    }
    toast.success("Post Created");
    setPostMessage("");
    onClose();
  };

  return (
    <motion.main
      exit={{ opacity: 0 }}
      className="absolute w-full md:fixed top-0 right-0 h-screen z-103 flex justify-center items-start md:items-center bg-[#FFA1B3]/30"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="flex flex-col w-full h-full overflow-y-auto md:w-[400px] rounded-sm bg-white justify-start"
      >
        <section className="flex items-center p-2 justify-between border-b-1">
          <div className="flex items-center gap-4">
            <ChevronLeft className="cursor-pointer" onClick={onClose} />
            <h1>Create post</h1>
          </div>
          <Button
            onClick={handlePost}
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
          {previewPic && (
            <div
              className="w-64 h-64 relative self-center"
              onMouseOver={() => setPicHover(true)}
              onMouseOut={() => setPicHover(false)}
            >
              <NextImage
                src={previewPic}
                alt="postPic"
                unoptimized
                fill
                className="object-contain"
              />
              {picHover && (
                <div className="absolute h-full w-full bg-black/50">
                  <Trash
                    onClick={removePic}
                    size="28"
                    color="white"
                    className="absolute bottom-3 right-3 cursor-pointer hover:scale-110 transition-all"
                  />
                </div>
              )}
            </div>
          )}
          <label
            htmlFor="postID"
            className="flex cursor-pointer self-start items-center gap-1 text-md prismo mt-1 mb-1"
          >
            <Image size="25" />
            <span>Photos</span>
            <input
              id="postID"
              type="file"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
          </label>
          <div className="relative select-none self-start">
            <div
              ref={gifButtonRef}
              onClick={() => setGifModal(!gifModal)}
              className="flex cursor-pointer ml-[2px] items-center gap-1 text-md prismo"
            >
              <img src="/icons/gif.svg" alt="gificon" className="prismo" />
              <span>GIF</span>
            </div>
            {gifModal && <GifSearch setGifModal={setGifModal} setPreviewPic={setPreviewPic} setGif={setGif} gifButtonRef={gifButtonRef} />}
          </div>
        </section>
      </motion.div>
    </motion.main>
  );
}
