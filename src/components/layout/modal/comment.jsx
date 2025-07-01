'use client'
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SendHorizontal } from "lucide-react"
import clsx from "clsx";

export function CommentModal({ isOpen, Close }) {
  const [commentData, setCommentData] = useState("")

  return (
    isOpen && (
      <div className="fixed top-0 right-0 z-100 w-full h-screen bg-[#FFA1B3]/30 flex justify-center items-center">
        <div className="w-[400px] relative h-[400px] rounded-xl p-2 bg-white">
          <button onClick={Close}>Close</button>
          <div className="footer absolute w-[94%] flex gap-2 justify-start items-start bottom-2 left-3 ">
              <Image src="/jake.jpg" width="40" height="40" alt="dp" className="rounded-full" />
              <Textarea value={commentData} onChange={(e)=>{setCommentData(e.target.value)}} placeholder="What are your thoughts?" className="h-[50px] resize-none" />
              <SendHorizontal size="28" color="#FFA1B3" className={clsx("self-end hover:scale-120 cursor-pointer transition-all",{ "block":commentData, "hidden":!commentData }  )} />
          </div>
        </div>
      </div>
    )
  );
}
