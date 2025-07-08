"use client";
import { Pencil, Camera } from "lucide-react";
import { storeUser } from "@/hooks/state";
import { OwnPost } from "@/components/layout/Profile/UserPost";
import { useUserPosts } from "@/hooks/fetchUserPost";
import { useState } from "react";
import clsx from "clsx";

export default function ProfilePage() {
  const user = storeUser((state) => state.user);
  const [edit, setEdit] = useState(false);

  const { posts, loading } = useUserPosts(user?.uid);

  return (
    <div className="flex mt-[2%] rounded-lg flex-col items-start">
      <section className="bg-white relative pt-1 pb-3 px-3 w-full mb-2 rounded-lg">
        <Pencil onClick={()=>setEdit(!edit)} height="20" width="20" className="prismo absolute right-3 top-3 select-none hover:scale-115 transition-all cursor-pointer" />
        <h1 className="prismo font-semibold mb-2">{user.username}</h1>
        <figure className="flex items-start gap-4">

          <div className="PROFILE-PIC relative yellow-bg h-[100px] w-[100px]">
            {edit?
            <div className="shadow absolute flex justify-center items-center w-full h-full bg-black/50"> 
              <Camera height="30" width="30" className="hover:scale-120 transition-all text-white cursor-pointer hover:text-pink-300 " />
            </div> : <></>
            }
            

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

      <OwnPost user={user} posts={posts} loading={loading} />
    </div>
  );
}
