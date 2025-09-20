"use client";
import Image from "next/image";
import { SendHorizonal, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { sendMessage, useChatMessages } from "@/services/chat.service";

export default function Message({ currentUser, chatUser, close }) {
  const [textQuery, setTextQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const {messages, loadingMessage} = useChatMessages(currentUser.uid, chatUser.uid)

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await sendMessage(currentUser.uid, chatUser.uid, textQuery);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTextQuery("");
    }
  };
console.log(messages)
  return (
    <div className="fixed flex flex-col justify-between w-[270px] h-[330px] bottom-3 right-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
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
        <button
          onClick={close}
          className="cursor-pointer hover:scale-107 transition-all"
        >
          <X size="22" />
        </button>
      </div>
      <div className="flex flex-col border">
        {messages.map((message)=>(
      <div key={message.id}>
        {message.senderId === chatUser.uid ? (
        <div className="flex gap-1 items-center">
          <figure className="w-7 h-7 relative">
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
        <p className="text-[12px]">{message.text}</p>
        </div>
        ) : <h1 className="">{message.text}</h1>}
      </div>
      ))}
      </div>
      
      <div className="flex items-center gap-2 p-2 w-full justify-between">
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          onChange={(e) => setTextQuery(e.target.value)}
          value={textQuery}
          className="h-[40px] w-full text-[14px] rounded-md resize-none p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
          placeholder="type something"
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          hidden={!textQuery}
          className={`transition-all ${
            loading ? "text-gray-500" : "cursor-pointer prismo hover:scale-107"
          }`}
        >
          <SendHorizonal size="22" />
        </button>
      </div>
    </div>
  );
}
