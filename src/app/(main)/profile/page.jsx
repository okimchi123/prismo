"use client";
import { storeUser } from "@/hooks/state";
import { OwnPost } from "@/components/layout/Profile/UserPost";
import { useUserPosts } from "@/hooks/fetchUserPost";

export default function ProfilePage() {
  const user = storeUser((state) => state.user);
  const { posts, loading } = useUserPosts(user?.uid);

  return (
    <div className="flex mt-[2%] rounded-lg flex-col items-start">
      <section className="bg-white pt-1 pb-3 px-3 w-full mb-2 rounded-lg">
        <h1 className="prismo font-semibold mb-2">{user.username}</h1>
        <figure className="flex items-start gap-4">
          <div className="PROFILE-PIC yellow-bg h-[100px] w-[100px]"></div>
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
