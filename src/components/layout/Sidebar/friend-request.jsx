"use client";
import { SmallDisplayImg } from "@/components/ui/display-image";
import { Check, Circle, Ellipsis } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { AcceptRequest } from "@/hooks/Friend";

export default function FriendRequestCard({ fromUser, toUser, setToggle }) {
  const [hover, setHover] = useState(false);
  const [modal, setModal] = useState(false);
  const acceptIcon = {
    enter: {
      transform: "translateX(0px)",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      transform: "translateX(28px)",
      opacity:0,
      transition: { duration: 0.3 },
    },
  };
  const declineIcon = {
    enter: {
      transform: "translateX(0px)",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      transform: "translateX(-28px)",
      opacity:0,
      transition: { duration: 0.3 },
    },
  };

  const mouseLeave = () => {
    setModal(false)
    setTimeout(()=>{setHover(false)},300)
  }

  const mouseEnter = () => {
    setHover(true)
    setModal(true)
  }

  const AcceptFriend = async () => {
    AcceptRequest( fromUser.uid, toUser.uid, fromUser.reqID )
    setToggle(e=>!e)
  } 

  return (
    <figure className="flex justify-between items-center p-1">
      <div className="flex gap-1 items-start">
        {fromUser.localPic ? (
          <SmallDisplayImg img={fromUser.localPic || "/jake.jpg"} />
        ) : (
          <SmallDisplayImg img={fromUser.dpURL || "/jake.jpg"} />
        )}
        <h1 className="text-md"> {fromUser.username} </h1>
      </div>
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        className="flex gap-1"
      >
        {hover ? (
          <>
            <motion.div
            initial="exit"
            onClick={AcceptFriend}
            animate={modal ? "enter" : "exit"}
            variants={acceptIcon}
            className="border p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-500 transition-all">
              <Check size="23" color="white" />
            </motion.div>
            <motion.div 
            initial="exit"
            animate={modal ? "enter" : "exit"}
            variants={declineIcon}
            className="border p-2 rounded-md cursor-pointer bg-red-400 hover:bg-red-500 transition-all">
              <Circle size="21" color="white" />
            </motion.div>
          </>
        ) : (
          <Ellipsis className="mr-8" size="21" />
        )}
      </div>
    </figure>
  );
}
