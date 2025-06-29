'use client'
import { motion } from "framer-motion"
import Image from "next/image"

export function Cube(){
    const sides = "bg-[#FFA1B3] flex items-center justify-center h-full w-full absolute border-white border-2"

    const logo = <Image src="/icon.svg" width="75" height="75" alt="Loading..." className="" />;

    return(
        <motion.div animate={{
            rotateZ:[90,180,5,90],
            rotateX:[60,100,10,60],
            rotateY:[20,100,5,20]
        }}
        transition={{
            duration:4, repeat: Infinity, repeatDelay: 0
        }} className="transform-3d relative rounded-lg w-[150px] h-[150px]">
              <motion.div className={`front ${sides} translate-z-[75px]`}> {logo} </motion.div>  
              <motion.div className={`back ${sides} -translate-z-[75px]`}> {logo} </motion.div> 
              <motion.div className={`left ${sides} -translate-x-[75px] rotate-y-90`}> {logo} </motion.div>
              <motion.div className={`right ${sides} translate-x-[75px] -rotate-y-90`}> {logo} </motion.div>
              <motion.div className={`top ${sides} -translate-y-[75px] rotate-x-90`}> {logo} </motion.div>
              <motion.div className={`bottom ${sides} translate-y-[75px] -rotate-x-90`}> {logo}  </motion.div>
        </motion.div>
    )
}