"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DisplayImage } from "@/components/ui/display-image";
import { useState, useEffect } from "react";
import { storeUser } from "@/hooks/state";
import PostModal from "@/components/layout/modal/Post";
import UserPost from "@/components/layout/Dashboard/Post";
import { listenToAllPosts } from "@/hooks/fetchUserPost";
import { AnimatePresence } from "framer-motion";
import Loading from "@/components/Loading";

export default function Page() {
  const { user, loading } = storeUser();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenToAllPosts(user.uid, setPosts);

    return () => unsubscribe();
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if(loading) return <Loading />

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
          <UserPost key={post.postID} post={post} user={user} />
        ))
      )}
    </main>
  );
}
