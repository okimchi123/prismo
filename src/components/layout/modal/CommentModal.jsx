"use client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import clsx from "clsx";
import { addComment, getComment } from "@/services/comment.service";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

export default function CommentModal({ Close, postID, user }) {
  const [commentData, setCommentData] = useState("");
  const comments = getComment(postID);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.trim()) return;

    await addComment(postID, commentData, user.uid, user.username);
    setCommentData("");
  };

  return (
      <motion.div exit={{opacity:0}} className="fixed top-0 right-0 z-100 w-full h-screen bg-[#FFA1B3]/30 flex justify-center items-center">
          <motion.div
            key="modal"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-[400px] relative h-[400px] rounded-xl pt-6 pb-2 px-2 bg-white"
          >
            <button className="text-sm absolute right-2 top-2" onClick={Close}>
              Close
            </button>
            <section className="w-[95%] flex flex-col gap-2">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-card flex gap-2">
                  <figure className="w-12 h-12 relative">
                    <Image
                      src={user.dpURL || "/finn.jpg"}
                      fill
                      alt="profile_pic"
                      className="object-cover rounded-md"
                    />
                  </figure>
                  <div className="name-message flex flex-col">
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
              <Image
                src="/jake.jpg"
                width="40"
                height="40"
                alt="dp"
                className="rounded-full"
              />
              <Textarea
                value={commentData}
                onChange={(e) => {
                  setCommentData(e.target.value);
                }}
                placeholder="What are your thoughts?"
                className="h-[50px] resize-none"
              />
              <SendHorizontal
                onClick={handleSubmit}
                size="28"
                color="#FFA1B3"
                className={clsx(
                  "self-end hover:scale-120 cursor-pointer transition-all",
                  { block: commentData, hidden: !commentData }
                )}
              />
            </div>
          </motion.div>
        </motion.div>
  );
}
