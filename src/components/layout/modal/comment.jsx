'use client'
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SendHorizontal } from "lucide-react"
import clsx from "clsx";
import { addComment, getComment } from "@/services/comment.service";

export function CommentModal({ isOpen, Close, postID, user }) {
  const [commentData, setCommentData] = useState("")
  const userName = `${user?.firstname} ${user?.lastname}`
  const comments = getComment(postID)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!commentData.trim()) return;

    await addComment(postID, commentData, user.uid, userName)
    setCommentData("")
  }

  return (
    isOpen && (
      <div className="fixed top-0 right-0 z-100 w-full h-screen bg-[#FFA1B3]/30 flex justify-center items-center">
        <div className="w-[400px] relative h-[400px] rounded-xl p-2 bg-white">
          <button onClick={Close}>Close</button>
          <section className="w-[95%] flex flex-col gap-1">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <h1>{comment.userName}</h1>
                <p>{comment.commentData}</p>
              </div>
            ))}
            
          </section>
          <div className="footer absolute w-[94%] flex gap-2 justify-start items-start bottom-2 left-3 ">
              <Image src="/jake.jpg" width="40" height="40" alt="dp" className="rounded-full" />
              <Textarea value={commentData} onChange={(e)=>{setCommentData(e.target.value)}} placeholder="What are your thoughts?" className="h-[50px] resize-none" />
              <SendHorizontal onClick={handleSubmit} size="28" color="#FFA1B3" className={clsx("self-end hover:scale-120 cursor-pointer transition-all",{ "block":commentData, "hidden":!commentData }  )} />
          </div>
        </div>
      </div>
    )
  );
}
