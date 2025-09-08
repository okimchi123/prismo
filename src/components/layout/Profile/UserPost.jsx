"use client";
import UserPost from "@/components/layout/Dashboard/Post";

export function OwnPost({ user, posts, loading }) {

  if(loading) return <h1>Loading posts...</h1>
  return (
    <section className="flex w-full flex-col gap-2 items-center">
      {posts.length === 0 ? (
        <p>No post yet</p>
      ) : (
        posts.map((post) => (
          <UserPost key={post.id} post={post} loading={loading} user={user} />
        ))
      )}
    </section>
  );
}
