"use client";
import Image from "next/image";
import { X } from "lucide-react";

export default function Message({ currentUser, chatUser, close }) {
  return (
    <div className="fixed w-[270px] h-[330px] bottom-3 right-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
      <div className="flex justify-between items-center w-full p-2 shadow-[0_3px_6px_rgb(0,0,0,0.1)]">
        <div className="flex gap-2 items-center">
          <figure className="w-9 h-9 relative">
            <Image
              src={
                chatUser.localPic
                  ? chatUser.localPic
                  : chatUser.dpUrl
                  ? chatUser.dpUrl
                  : "/jake.jpg"
              }
              fill
              alt="profile_pic"
              className="object-cover rounded-full"
            />
          </figure>
          <h1 className="text-[14px] font-medium">{chatUser.username}</h1>
        </div>
         <button onClick={close} className="cursor-pointer hover:scale-107 transition-all"><X size="22" /></button>
      </div>
      <section></section>
      <div></div>
    </div>
  );
}
