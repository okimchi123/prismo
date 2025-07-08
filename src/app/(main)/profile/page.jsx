"use client";
import { Pencil, Camera } from "lucide-react";
import { storeUser } from "@/hooks/state";
import { OwnPost } from "@/components/layout/Profile/UserPost";
import { useUserPosts } from "@/hooks/fetchUserPost";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function ProfilePage() {
  const user = storeUser((state) => state.user);
  const [edit, setEdit] = useState(false);

  const { posts, loading } = useUserPosts(user?.uid);

  return (
    <div className="flex mt-[2%] rounded-lg flex-col items-start">
      <section className="bg-white relative pt-1 pb-3 px-3 w-full mb-2 rounded-lg">
        <button className="absolute right-3 top-3 select-none not-last:cursor-pointer" 
        onClick={()=>setEdit(true)}
        disabled={edit}
        >
        <Pencil  
        height="20" 
        width="20" 
        className={clsx(" transition-all",
          {"text-gray-300":edit, 
          "prismo hover:scale-115":!edit}
         )}
        />
        </button>
        
        <h1 className="prismo font-semibold mb-2">{user.username}</h1>
        <figure className="flex items-start gap-4">

          <div className="PROFILE-PIC relative yellow-bg h-[100px] w-[100px]">
            {edit?
            <div className="shadow absolute flex justify-center items-center w-full h-full bg-black/50"> 
              <Camera height="30" width="30" className="hover:scale-120 transition-all select-none text-white cursor-pointer hover:text-pink-300 " />
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
        {edit?
          <div className="absolute right-3 bottom-3 flex gap-2">
            <Button 
            className="border-red-500 border-2 bg-white/0 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition-all active:scale-100"
            onClick={()=>setEdit(false)}
            > Cancel </Button>
            <Button className="text-white bg-prismo hover:bg-prismo hover:scale-110 transition-all active:scale-100"> Save </Button>
          </div>
            : <></>
        }
      </section>

      <OwnPost user={user} posts={posts} loading={loading} />
    </div>
  );
}
