import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function PrismoPics({ modalState, close }) {
  const PicAnimate = {
    enter: {
      scale: 1,
      transition: { duration: 0.3 },
      display: "flex",
    },
    exit: {
      scale: 0,
      transition: { duration: 0.3 },
      display: "none",
    },
  };
  return (
    <motion.div 
    animate={modalState?{opacity:1,display:"flex"}:{opacity:0,display:"none"}}
    exit={{opacity:0}}
    className="h-screen w-full fixed items-center justify-center top-0 left-0 bg-gray-900/40 z-10000">
      <motion.section
        initial="exit"
        animate={modalState ? "enter" : "exit"}
        variants={PicAnimate}
        className="bg-white relative rounded-lg w-[400px] h-[300px]"
      >
        <XCircle
          onClick={close}
          className="absolute top-2 right-2 text-red-600 hover:text-red-500 transition-all"
          size="24"
        />
      </motion.section>
    </motion.div>
  );
}
