'use client'
import { ArrowLeft } from "lucide-react"
export default function PostModal({isOpen, onClose}){

    return (
        isOpen && (
          <main className="absolute w-full top-0 h-screen z-100 flex justify-center items-center bg-white">
            <ArrowLeft className="absolute left-3 top-3"
            onClick={onClose}
            />
            <form action="" className="bg-white w-[30%] h-[50%]">
                <h1>Post here</h1>
            </form>
        </main>  
        )
    )
}