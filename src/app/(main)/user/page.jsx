"use client";
import ProfileUserData from "@/components/ui/ProfileUserData";
import { useUserPosts } from "@/hooks/fetchUserPost";
import { selectedUser } from "@/hooks/state";
import { OwnPost } from "@/components/layout/Profile/UserPost";

export default function Page() {
  const user = selectedUser((state) => state.user);
  console.log(user)
  const { posts, loading } = useUserPosts(user?.uid);

  console.log(posts)
  return (
    <div className="flex mt-[2%] min-w-[400px] rounded-lg flex-col items-start">
      <section className="bg-white relative pt-1 pb-3 px-3 w-full mb-2 rounded-lg">
        <h1 className="prismo font-semibold mb-2">{user.username}</h1>
        <ProfileUserData user={user} posts={posts} />
      </section>

      <OwnPost user={user} posts={posts} loading={loading} />
    </div>
  );
}
