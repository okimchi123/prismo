import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deletePostHook } from "@/services/post.service"

export default function DeletePost({post, Close, friends}){

    const handleDelete = async () => {
        await deletePostHook(post.userId, post.postID, friends)
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
        className="flex flex-col gap-2 pt-4 pb-3 px-7 rounded-sm relative bg-white items-center justify-center"
      >
        <div className="flex items-center gap-1">
            <Trash2 size="18" />
           <h1 className="font-medium">Are you sure to delete this post?</h1> 
        </div>
        
        <div className="flex gap-1 self-end">
          <Button onClick={Close}>Cancel</Button>
          <Button 
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600">Yes</Button>
        </div>
      </motion.div>
    </motion.main>
    )
}