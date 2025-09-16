"use client";
import { DisplayImage } from "@/components/ui/display-image";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { LikeButton } from "@/components/ui/likeButton";
import { useState, useEffect, useRef } from "react";
import CommentModal from "../Modal/CommentModal";
import { AnimatePresence } from "framer-motion";
import { storeUser } from "@/hooks/state";
import { CircleEllipsis, PencilIcon, Trash } from "lucide-react";
import EditPost from "../Modal/EditPost";

export default function UserPost({ post, user }) {
  const [commentModal, setCommentModal] = useState(false);
  const currentUser = storeUser((state) => state.user);
  const [infoModal, setInfoModal] = useState(false);
  const infoRef = useRef(null);
  const infoButtonRef = useRef(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = commentModal ? "hidden" : "auto";
  }, [commentModal]);

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (infoRef.current && !infoRef.current.contains(event.target) && !infoButtonRef.current.contains(event.target)) {
            setInfoModal(false)
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  const editButton = () => {
    setInfoModal(false)
    setEditModal(true)
  }

  return (
    <>
      <AnimatePresence>
        {commentModal && (
          <CommentModal
            Close={() => setCommentModal(false)}
            postID={post.postID}
            user={user}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {editModal && (
          <EditPost Close={()=>setEditModal(false)} post={post} />
        )}
      </AnimatePresence>
      <main className="bg-white rounded-xs relative w-full p-3 flex flex-col gap-2">
        {post.userId === user.uid && (
          <div className=" absolute select-none right-3 top-3">
            <CircleEllipsis
              ref={infoButtonRef}
              onClick={() => setInfoModal(!infoModal)}
              size="22"
              className="hover:scale-107 prismo transition-all cursor-pointer"
            />
            {infoModal && (
              <div ref={infoRef} className="bg-white absolute flex flex-col gap-3 py-3 px-6 shadow-lg rounded-sm">
                <button 
                onClick={()=>editButton()}
                className="flex gap-1 text-green-500 cursor-pointer hover:scale-107 transition-all">
                  <PencilIcon size="18"/>
                  <span className="text-sm">Edit</span>
                </button>
                <button className="flex gap-1 text-red-500 cursor-pointer hover:scale-107 transition-all">
                  <Trash size="18" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            )}
          </div>
        )}
        <header>
          <figure className="flex gap-1">
            <DisplayImage
              img={
                post.userLocalPic
                  ? post.userLocalPic
                  : post.userDP
                  ? post.userDP
                  : "/jake.jpg"
              }
            />
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
        {post.postMedia ? (
          <figure className="w-64 h-64 relative self-center">
            <Image
              src={post.postMedia}
              alt="postPic"
              unoptimized
              fill
              className="object-contain"
            />
          </figure>
        ) : (
          <></>
        )}

        <footer className="flex items-start">
          <LikeButton
            postId={post.postID}
            userId={currentUser?.uid}
            currentLikes={post.likes || []}
          />
          <Image
            onClick={() => setCommentModal(true)}
            className="cursor-pointer"
            src="/post/comment.svg"
            height="35"
            width="35"
            alt="comment-icon"
          />
        </footer>
      </main>
    </>
  );
}
