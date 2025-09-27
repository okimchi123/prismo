"use client";
import Image from "next/image";
import { SendHorizonal, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { sendMessage, useChatMessages } from "@/services/chat.service";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";

export default function Message({ currentUser, chatUser, close }) {
  const [textQuery, setTextQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const { messages, loadingMessage } = useChatMessages(
    currentUser.uid,
    chatUser.uid
  );
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const messagesEndRef = useRef(null);
  const isMobile = useIsMobile();

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

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && messages.length > visibleMessages.length) {
      const newPage = page + 1;
      const start = Math.max(messages.length - newPage * pageSize, 0);
      const end = messages.length - (page - 1) * pageSize;
      setVisibleMessages(messages.slice(start, end));
      setPage(newPage);
    }
  };

  useEffect(() => {
    const start = Math.max(messages.length - pageSize, 0);
    const end = messages.length;
    setVisibleMessages(messages.slice(start, end));
    setPage(1);
  }, [messages]);

  useEffect(() => {
  requestAnimationFrame(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });
}, [messages.length]);

  return (
    <div className={clsx(`fixed flex flex-col justify-between z-1000  bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg`,
      {
        "w-full h-full top-0 left-0":isMobile,
        "w-[270px] h-[330px] bottom-3 right-8 ":!isMobile,
      }
    )}>
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
      <div
        onScroll={handleScroll}
        className="flex flex-col border justify-end flex-1 min-h-0 gap-2 py-1 px-1 overflow-y-auto"
      >
        {visibleMessages.map((message) => (
          <div key={message.id}>
            {message.senderId === chatUser.uid ? (
              <div className="flex gap-1 items-start">
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
                <p className="text-[12px] max-w-[150px]">{message.text}</p>
              </div>
            ) : (
              <p className="justify-self-end text-[12px] max-w-[150px]">
                {message.text}
              </p>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
