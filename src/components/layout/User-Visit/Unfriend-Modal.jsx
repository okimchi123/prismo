import { motion, AnimatePresence } from "framer-motion";

export default function UnfriendModal({ toggle }) {
  const PicAnimate = {};
  return (
    <AnimatePresence>
  {toggle && (
    <motion.div
      onClick={() => console.log("pindot")}
      initial={{ opacity: 0, y: -7 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0 } }}
      exit={{ opacity: 0, y: -7, transition: { duration: 0.20 } }}
      className="absolute z-200 mt-2 py-2 px-5 rounded-md shadow-lg bg-white hover:bg-pink-100 transition-all"
    >
      <h1 className="select-none">Unfriend</h1>
    </motion.div>
  )}
</AnimatePresence>
  );
}
