'use client'
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfileData({ close, user }) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed top-0 right-0 z-100 w-full h-screen bg-[#FFA1B3]/30 flex justify-center items-center"
    >
      <motion.div
        className="w-[500px] h-[90%] bg-white pt-5 relative rounded-lg flex flex-col items-center"
        key="modal"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <strong onClick={close} className="absolute top-2 right-2">
          close
        </strong>
        <section className="flex flex-col items-center gap-1 select-none">
            <figure className="w-23 h-23 relative">
          <Image
            src={user.dpURL || "/jake.jpg"}
            fill
            className="rounded-full object-cover"
            alt="DP"
          />
        </figure>
        <span className="text-sm py-1 font-medium prismo cursor-pointer hover:scale-105 transition-all">Change Image</span>
        </section>
        

      </motion.div>
    </motion.div>
  );
}
