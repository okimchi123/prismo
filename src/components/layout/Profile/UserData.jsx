"use client";
import { Pencil } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ProfileData from "../modal/ProfileData";
import { AnimatePresence } from "framer-motion";

export default function UserData({ user, posts }) {
  const [editModal, setEditModal] = useState(false);

  
  return (
    <>
    <AnimatePresence>{editModal &&  <ProfileData close={()=>setEditModal(false)} user={user} />}</AnimatePresence> 
    <section className="bg-white relative pt-1 pb-3 px-3 w-full mb-2 rounded-lg">
      <button
        className="absolute right-3 top-3 select-none"
        onClick={() => setEditModal(true)}
        disabled={editModal}
      >
        <Pencil
          height="20"
          width="20"
          className="transition-all prismo hover:scale-115 cursor-pointer"
        />
      </button>
      <h1 className="prismo font-semibold mb-2">{user.username}</h1>
      <figure className="flex items-start gap-4">
        <div className="PROFILE-PIC flex justify-center items-center relative yellow-bg h-[100px] w-[100px]">
          <figure className="w-18 h-18 relative">
                    {user.localPic ? (
                      <Image
                    src={user.localPic||"/jake.jpg"}
                    fill
                    className="rounded-full object-cover"
                    alt="DP"
                  /> ) : (
                    <Image
                    src={user.dpURL||"/jake.jpg"}
                    fill
                    className="rounded-full object-cover"
                    alt="DP"
                  />
                  )}
                    
                </figure>
        </div>

        <div className="USER-DATA flex flex-col gap-2 h-[100px] py-2 justify-between">
          <h1 className="FULLNAME text-lg font-medium leading-4">
            {user.firstname} {user.lastname}
          </h1>
          <div className="FRIENDS-POSTS flex gap-3">
            <div className="flex flex-col items-center">
              <p className="text-sm"> 3 </p>
              <h2 className="leading-3 text-sm">friends</h2>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm"> {posts.length} </p>
              <h2 className="leading-3 text-sm">posts</h2>
            </div>
          </div>
        </div>
      </figure>
    </section>
    </>
    
  );
}
