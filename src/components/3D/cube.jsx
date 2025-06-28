'use client'
import { motion } from "framer-motion"

export function Cube(){
    const sides = "bg-[#FFA1B3] h-full w-full absolute border-white border-2"
    return(
        <motion.div animate={{
            rotateZ:[90,180,5,90],
            rotateX:[60,100,10,60],
            rotateY:[20,100,5,20]
        }}
        transition={{
            duration:5, repeat: Infinity, repeatDelay: 0
        }} className="transform-3d relative rounded-lg w-[200px] h-[200px]">
              <motion.div className={`front ${sides} translate-z-[100px]`}></motion.div>  
              <motion.div className={`back ${sides} -translate-z-[100px]`}></motion.div> 
              <motion.div className={`left ${sides} -translate-x-[100px] rotate-y-90`}></motion.div>
              <motion.div className={`right ${sides} translate-x-[100px] -rotate-y-90`}></motion.div>
              <motion.div className={`top ${sides} -translate-y-[100px] rotate-x-90`}></motion.div>
              <motion.div className={`bottom ${sides} translate-y-[100px] -rotate-x-90`}></motion.div>
        </motion.div>
    )
}