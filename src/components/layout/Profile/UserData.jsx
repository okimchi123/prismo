"use client";
import { Pencil, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import ChangePic from "@/services/profile-pic.service";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/anim/Loading";

export default function UserData({ user, posts }) {
  const [file, setFile] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
    setPreviewPic(URL.createObjectURL(newFile));
  };

  const handleSave = async () => {
    if (!file) return;
    try {
      setLoading(true);
      await ChangePic(file, user.uid);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEdit(false);
      setPreviewPic(null)
      setFile(null)
    }
  };

  return (
    <>
    <AnimatePresence>{loading && <LoadingSpinner />} </AnimatePresence>
    <section className="bg-white relative pt-1 pb-3 px-3 w-full mb-2 rounded-lg">
      <button
        className="absolute right-3 top-3 select-none"
        onClick={() => setEdit(true)}
        disabled={edit}
      >
        <Pencil
          height="20"
          width="20"
          className={clsx(" transition-all", {
            "text-gray-400": edit,
            "prismo hover:scale-115 cursor-pointer": !edit,
          })}
        />
      </button>

      <h1 className="prismo font-semibold mb-2">{user.username}</h1>
      <figure className="flex items-start gap-4">
        <div className="PROFILE-PIC flex justify-center items-center relative yellow-bg h-[100px] w-[100px]">
          <figure className="w-18 h-18 relative">
                    <Image
                    src={user.dpURL||"/jake.jpg"}
                    fill
                    className="rounded-full object-cover"
                    alt="DP"
                  />
                </figure>
          {edit ? (
            <div className="shadow absolute top-0 right-0 flex justify-center items-center w-full h-full bg-black/50">
              <label htmlFor="profileID" className="cursor-pointer">
                {previewPic ? (
                <figure className="w-18 h-18 relative">
                    <Image
                    src={previewPic}
                    fill
                    className="rounded-full object-cover"
                    alt="newPic"
                  />
                </figure>
                  
                ) : (
                  <Camera
                    height="30"
                    width="30"
                    className="hover:scale-120 transition-all select-none text-white cursor-pointer hover:text-pink-400 "
                  />
                )}
              </label>
              <input
                id="profileID"
                type="file"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
            </div>
          ) : (
            <></>
          )}
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
      {edit ? (
        <div className="absolute right-3 bottom-3 select-none flex gap-2">
          <Button
            className="border-red-500 border-2 bg-white/0 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition-all active:scale-100"
            onClick={() => setEdit(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className={clsx(
              "text-white  hover:scale-110 transition-all active:scale-100",
              { "bg-prismo hover:bg-prismo": file }
            )}
            disabled={!file}
          >
            Save
          </Button>
        </div>
      ) : (
        <></>
      )}
    </section>
    </>
    
  );
}
