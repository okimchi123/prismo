"use client";
import ProfileUserData from "@/components/ui/ProfileUserData";
import { UserPlus } from "lucide-react";
import { useUserPosts } from "@/hooks/fetchUserPost";
import { use } from "react";
import { OwnPost } from "@/components/layout/Profile/UserPost";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/hooks/fetchAllUser";
import { storeUser } from "@/hooks/state";
import AddFriend from "@/hooks/Friend";

export default function Page({params}) {
  const {username} = use(params);
  const [user, setUser] = useState({})
  const currentUser = storeUser((state)=>state.user)

  async function handleAddFriend(){
    await AddFriend(currentUser.uid, user.uid)
  }

  useEffect(()=>{
    async function fetchUsers() {
      const users = await getAllUsers()
    
    const user = users.find((u) => {
      return u.username.toLowerCase() === username;
    })
    setUser(user)
  }
  fetchUsers();
  },[username])

  const { posts, loading } = useUserPosts(user?.uid);

  return (
    <div className="flex mt-[2%] min-w-[420px] rounded-lg flex-col items-start">
      <section className="bg-white relative pt-1 pb-3 px-3 w-full mb-2 rounded-lg">
        <h1 className="prismo font-semibold mb-2">{user.username}</h1>
        <ProfileUserData user={user} posts={posts} />
        <button 
        onClick={()=>handleAddFriend()}
        className="absolute flex gap-1 items-center bottom-4 right-4 text-sm cursor-pointer">
          <UserPlus size="17" />
           Add Friend
          </button>
      </section>

      <OwnPost user={user} posts={posts} loading={loading} />
    </div>
  );
}
