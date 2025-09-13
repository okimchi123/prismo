'use client'
import { motion } from "framer-motion"

export default function EditPost({Close}){
    return(
        <motion.main
      exit={{ opacity: 0 }}
      className="absolute w-full md:fixed top-0 right-0 h-screen z-103 flex justify-center items-start md:items-center bg-[#FFA1B3]/30"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="flex flex-col rounded-sm h-[200px] w-[400px] relative bg-white justify-start"
      >
        <button className="text-sm absolute right-2 top-2" onClick={Close}>
          Close
        </button>
        Edit
      </motion.div>
    </motion.main>
    )
}