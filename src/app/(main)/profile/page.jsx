"use client";
import { storeUser } from "@/hooks/state";
import { OwnPost } from "@/components/layout/Profile/UserPost";
import { useUserPosts } from "@/hooks/fetchUserPost";
import UserData from "@/components/layout/Profile/UserData";

export default function ProfilePage() {
  const user = storeUser((state) => state.user);

  const { posts, loading } = useUserPosts(user?.uid);

  return (
    <div className="flex mt-[2%] rounded-lg flex-col items-start">
      <UserData user={user} posts={posts} />

      <OwnPost user={user} posts={posts} loading={loading} />
    </div>
  );
}
