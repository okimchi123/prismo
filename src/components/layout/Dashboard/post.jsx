'use client'
import {DisplayImage} from "@/components/ui/display-image";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { LikeButton } from "@/components/ui/likeButton";
import { useState } from "react";
import CommentModal from "../modal/CommentModal";
import { AnimatePresence } from "framer-motion";

export default function UserPost({ post, loading, user }) {
  const [commentModal, setCommentModal] = useState(false)
  if (loading) return <p>Loading posts...</p>;
  return (
    <>
   <AnimatePresence> {commentModal &&  <CommentModal Close={() => setCommentModal(false)} postID={post.id} user={user} /> }</AnimatePresence> 
    <main className="bg-white rounded-xs w-full p-3 flex flex-col gap-2">
      <header>
        <figure className="flex gap-1">
          {user.localPic ? 
          (<DisplayImage img={ user.localPic || "/jake.jpg"} />)
          : (<DisplayImage img={ user.dpURL || "/jake.jpg"} />)
          }
         
          <div className="flex flex-col">
            <h1 className="text-[14px]">{post.userName}</h1>
            <p className="text-[12px] prismo">@{post.userUsername}</p>
            <small className="text-gray-500 text-[11px]">
              {formatDistanceToNow(post.createdAt.toDate(), {
                addSuffix: true,
              })}
            </small>
          </div>
        </figure>
      </header>
      <article className="max-w-[500px]">
        <p>{post.text}</p>
      </article>

      <footer className="flex items-start">
        <LikeButton postId={post.id} userId={user?.uid} currentLikes={post.likes || []} />
        <Image onClick={() => setCommentModal(true)} className="cursor-pointer" src="/post/comment.svg" height="35" width="35" alt="comment-icon" />
      </footer>
    </main>
    
    </>
  );
}
