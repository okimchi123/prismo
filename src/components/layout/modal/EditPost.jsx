'use client'
import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { editPost } from "@/services/post.service"

export default function EditPost({Close, post}){
  const [textInput, setTextInput] = useState("")

  const handleUpdate = async () => {
    await editPost(post.userId, post.postID, textInput)
    Close()
  }

    return(
        <motion.main
      exit={{ opacity: 0 }}
      className="absolute w-full md:fixed top-0 right-0 h-screen z-103 flex justify-center items-start md:items-center bg-[#FFA1B3]/30"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="flex flex-col gap-2 py-2 min-h-[150px] px-2 rounded-sm w-[400px] relative bg-white justify-start"
      >
        <h1 className="font-medium mb-2 ml-1">Edit Post</h1>
        <Textarea onChange={(e)=>setTextInput(e.target.value)} placeholder={post.text} />
        <div className="flex gap-1 self-end">
          <Button onClick={Close}>Cancel</Button>
          <Button 
          onClick={handleUpdate}
          hidden={!textInput.trim()} className="bg-green-500 hover:bg-green-600">Save</Button>
        </div>
      </motion.div>
    </motion.main>
    )
}