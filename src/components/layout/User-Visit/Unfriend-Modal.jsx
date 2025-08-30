'use client'
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ConfirmModal from "./Confirm";

export default function UnfriendModal({ toggle, setUnfriendToggle, user, currentUser, setToggleButton }) {
  const [ confirmToggle, setConfirmToggle ] = useState(false)
  const handleConfirm = () => {
    setUnfriendToggle(false)
    setConfirmToggle(true)
  }

  return (
    <>
    <ConfirmModal confirmToggle={confirmToggle} setConfirmToggle={setConfirmToggle} user={user} currentUser={currentUser} setToggleButton={setToggleButton} />
    <AnimatePresence>
  {toggle && (
    <motion.div
      onClick={handleConfirm}
      initial={{ opacity: 0, y: -7 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0 } }}
      exit={{ opacity: 0, y: -7, transition: { duration: 0.20 } }}
      className="absolute z-200 mt-2 py-2 px-5 rounded-md shadow-lg bg-white hover:bg-pink-100 transition-all"
    >
      <h1 className="select-none">Unfriend</h1>
    </motion.div>
  )}
</AnimatePresence>
    </>
    
  );
}
