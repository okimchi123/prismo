"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DisplayImage } from "@/components/ui/display-image";
import { useState, useEffect } from "react";
import { storeUser } from "@/hooks/state";
import PostModal from "@/components/layout/modal/Post";
import UserPost from "@/components/layout/Dashboard/post";
import { useUserPosts } from "@/hooks/fetchUserPost";
import { AnimatePresence } from "framer-motion";
import { getAllPosts } from "@/hooks/fetchUserPost";

export default function Page() {
  const user = storeUser((state) => state.user);
  const { posts, loading } = useUserPosts(user?.uid);
  // change this hook instead
  const [isOpen, setIsOpen] = useState(false);

  const AllPosts = getAllPosts(user.uid);
  console.log(AllPosts)

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <main className="flex flex-col md:w-[400px] items-center gap-2 sm:py-0 md:py-2 px-2">
      <AnimatePresence>
        {isOpen && <PostModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      <section className="w-full flex items-center justify-center rounded-lg gap-2 bg-white px-2 py-3">
        {user.localPic ? (
          <DisplayImage img={user.localPic || "/finn.jpg"} />
        ) : (
          <DisplayImage img={user.dpURL || "/finn.jpg"} />
        )}

        <Button
          onClick={() => setIsOpen((isOpen) => !isOpen)}
          className="bg-white text-gray-500 hover:bg-gray-300 transition-all font-normal gray-bg w-[80%] flex justify-start py-5 active:scale-98"
        >
          What's on your mind {user.firstname}?
        </Button>
      </section>
      {posts.length === 0 ? (
        <p>No post yet</p>
      ) : (
        posts.map((post) => (
          <UserPost key={post.id} post={post} loading={loading} user={user} />
        ))
      )}
    </main>
  );
}
