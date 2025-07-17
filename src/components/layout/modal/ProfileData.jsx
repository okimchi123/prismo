"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ChangePic from "@/services/profile-pic.service";
import clsx from "clsx";
import { Input } from "@/components/ui/input";

export default function ProfileData({ close, user }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewPic, setPreviewPic] = useState(null);

  const handleChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
    setPreviewPic(URL.createObjectURL(newFile));
  };

  const handleSave = async () => {
    if (!file) return;
    setLoading(true);
    try {
      toast.loading("Updating your profile...", { id: "load" });
      await ChangePic(file, user.uid);
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Updated!");
      setTimeout(() => {
        toast.dismiss("load");
      }, 3000);
      close();
      setPreviewPic(null);
      setFile(null);
    }
  };

  const labelDesign = "text-sm";

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed top-0 right-0 z-100 w-full h-screen bg-[#FFA1B3]/30 flex justify-center items-center"
    >
      <motion.div
        className="w-[500px] h-[80%] bg-white pt-5 relative rounded-lg flex flex-col items-center"
        key="modal"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <section className="flex flex-col items-center gap-1 select-none">
          <figure className="w-23 h-23 relative">
            {previewPic ? (
              <Image
                src={previewPic}
                fill
                className="rounded-full object-cover"
                alt="newPic"
              />
            ) : (
              <Image
                src={user.dpURL || "/jake.jpg"}
                fill
                className="rounded-full object-cover"
                alt="DP"
              />
            )}
          </figure>
          <label
            htmlFor="profileID"
            className="text-sm py-1 font-medium prismo cursor-pointer hover:scale-105 transition-all"
          >
            Change Image
          </label>
          <input
            id="profileID"
            type="file"
            accept="image/*"
            onChange={handleChange}
            hidden
          />
        </section>
        <section className="w-full flex flex-col items-start py-2 px-4 gap-1">
          <div className="flex w-full justify-between">
            <div>
              <label htmlFor="" className={labelDesign}>
                First name
              </label>
              <Input placeholder={user.firstname} />
            </div>
            <div>
              <label htmlFor="" className={labelDesign}>
                Lastname
              </label>
              <Input placeholder={user.lastname} />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div>
              <label htmlFor="" className={labelDesign}>
                Nickname
              </label>
              <Input placeholder={user.username} />
            </div>
            <div>
              <label htmlFor="" className={labelDesign}>
                Email
              </label>
              <Input placeholder={user.email} />
            </div>
          </div>
        </section>
        <div className="absolute right-3 bottom-3 select-none flex gap-2">
          <Button
            className="border-red-500 border-2 bg-white/0 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition-all active:scale-100"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className={clsx(
              "text-white  hover:scale-110 transition-all active:scale-100",
              { "bg-prismo hover:bg-prismo": file }
            )}
            disabled={!file || loading}
          >
            Save
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
