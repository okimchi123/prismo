"use client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import clsx from "clsx";
import { addComment, getComment } from "@/services/comment.service";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { CommentImage, SmallDisplayImg } from "@/components/ui/display-image";

export default function CommentModal({ Close, postID, user }) {
  const [commentData, setCommentData] = useState("");
  const [loading, setLoading] = useState(false);
  const comments = getComment(postID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.trim()) return;
    setLoading(true)
    await addComment(postID, commentData, user, setLoading);
    setCommentData("");
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed top-0 right-0 z-100 w-full h-screen bg-[#FFA1B3]/30 flex justify-center items-center"
    >
      <motion.div
        key="modal"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="w-[400px] relative h-[410px] rounded-xl pt-7 pb-2 px-2 bg-white"
      >
        <button className="text-sm absolute right-2 top-2" onClick={Close}>
          Close
        </button>
        <section className="w-full max-h-[300px] overflow-y-auto flex flex-col gap-2">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card flex gap-2">
              <SmallDisplayImg
                img={
                  comment.userLocalPic
                    ? comment.userLocalPic
                    : comment.userDP
                    ? comment.userDP
                    : "/jake.jpg"
                }
              />
              <div className="name-message flex flex-col w-[85%] ">
                <div className="user-data flex gap-2 items-center">
                  <h1 className="text-[12px] prismo">{comment.userName}</h1>
                  <small className="text-gray-500 text-[10px]">
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </small>
                </div>
                <p className="text-[13px]">{comment.commentData}</p>
              </div>
            </div>
          ))}
        </section>
        <div className="footer absolute w-[94%] flex gap-2 justify-start items-start bottom-2 left-3 ">
          {user.localPic ? (
            <CommentImage img={user.localPic} />
          ) : (
            <CommentImage img={user.dpURL} />
          )}

          <Textarea
            value={commentData}
            onChange={(e) => {
              setCommentData(e.target.value);
            }}
            placeholder="What are your thoughts?"
            className="h-[50px] resize-none"
          />
          <button 
          onClick={handleSubmit}
          disabled={loading}
          className={clsx(
              "self-end text-[#FFA1B3] transition-all",
              { block: commentData, hidden: !commentData, "text-gray-400 hover:scale-100":loading, "hover:scale-120 cursor-pointer":!loading }
            )}
          >
            <SendHorizontal
            size="24"
          />
          </button>
          
        </div>
      </motion.div>
    </motion.div>
  );
}
