import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Image from "next/image";
import { PicItems } from "@/models/prismoPics";
export default function PrismoPics({ modalState, close, handlePrismoChange }) {
  const PicAnimate = {
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

  return (
    <motion.div
      animate={
        modalState
          ? { opacity: 1, display: "flex" }
          : { opacity: 0, display: "none" }
      }
      exit={{ opacity: 0 }}
      className="h-screen w-full fixed items-center justify-center top-0 left-0 bg-gray-900/40 z-10000"
    >
      <motion.section
        initial="exit"
        animate={modalState ? "enter" : "exit"}
        variants={PicAnimate}
        className="bg-white relative grid-cols-3 gap-7 justify-center items-center rounded-lg p-8"
      >
        <XCircle
          onClick={close}
          className="absolute top-2 right-2 text-red-600 hover:text-red-500 hover:scale-110 transition-all"
          size="24"
        />
        {PicItems.map((Pic) => (
          <figure 
          key={Pic.picName} 
          className="w-23 h-23 relative hover:scale-110 transition-all" 
          onClick={()=>handlePrismoChange(Pic.picURL)}
          >
            <Image
              src={`/prismo-pics/${Pic.picName}.jpg`}
              fill
              className="rounded-full object-cover"
              alt="newPic"
            />
          </figure>
        ))}
      </motion.section>
    </motion.div>
  );
}
