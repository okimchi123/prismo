"use client";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import ProfileData from "../modal/ProfileData";
import { AnimatePresence } from "framer-motion";
import { EditImage } from "@/components/ui/display-image";
import ProfileUserData from "@/components/layout/Profile/ProfileUserData";

export default function UserData({ user, posts }) {
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
        document.body.style.overflow = editModal ? "hidden" : "auto";
      }, [editModal]);

  return (
    <>
      <AnimatePresence>
        {editModal && (
          <ProfileData close={() => setEditModal(false)} user={user} />
        )}
      </AnimatePresence>
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
        <ProfileUserData user={user} posts={posts}/>
      </section>
    </>
  );
}
