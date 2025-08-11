'use client'
import { SmallDisplayImg } from "@/components/ui/display-image"
import { Check, Circle } from "lucide-react"

export default function FriendRequestCard({ user }) {
    console.log(user)
    return (
        <figure className="flex justify-between items-center p-1">
            <div className="flex gap-1 items-start">
                {user.localPic ?
                    (<SmallDisplayImg img={user.localPic || "/jake.jpg"} />)
                    : (<SmallDisplayImg img={user.dpURL || "/jake.jpg"} />)
                }
                <h1 className="text-md"> {user.username} </h1>
            </div>
            <div className="flex gap-1">
                <div className="border p-2 rounded-md cursor-pointer bg-green-400 hover:bg-green-500 transition-all">
                    <Check size="23" color="white" />
                </div>
                <div className="border p-2 rounded-md cursor-pointer bg-red-400 hover:bg-red-500 transition-all">
                    <Circle size="21" color="white" />
                </div>
            </div>
        </figure>
    )
}