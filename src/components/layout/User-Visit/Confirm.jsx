"use client";
import { motion } from "framer-motion";
import { RemoveFriend } from "@/hooks/Friend";
import { toast } from "sonner";

export default function ConfirmModal({ confirmToggle, setConfirmToggle, user, currentUser, setToggleButton }) {
  const Animate = {
    enter: {
      scale: 1,
      transition: { duration: 0.3 },
      display: "grid",
    },
    exit: {
      scale: 0,
      transition: { duration: 0.3 },
      display: "none",
    },
  };

  async function handleUnfriend(){
    try {
        setToggleButton(prev=>!prev)
        await RemoveFriend(currentUser.uid, user.uid)
        toast.success(`You have Removed ${user.username} from your friend list`)
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <motion.div 
    initial={{opacity:0, display:"none"}}
    animate={confirmToggle ? {opacity:1, display:"flex"} : {opacity:0, display:"none"}}
    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial="exit"
        animate={confirmToggle ? "enter" : "exit"}
        variants={Animate}
        className="bg-white rounded-lg shadow-lg p-6 w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
        <p className="text-black font-medium">Are you sure you want to unfriend {user.username}?</p>
        <div className="flex justify-end gap-2 mt-6">
          <button className="px-4 py-2 rounded bg-gray-200"
          onClick={()=>setConfirmToggle(false)}
          >Cancel</button>
          <button
          onClick={()=>handleUnfriend()}
          className="px-4 py-2 rounded bg-red-600 text-white">
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
