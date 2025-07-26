"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChangePic, ChangeUserData, ChangeLocalPic } from "@/services/user-update";
import clsx from "clsx";
import EditUserData from "../Profile/EditUserData";
import { items } from "@/models/navItems";
import PrismoPics from "./PrismoPics";

export default function ProfileData({ close, user }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewPic, setPreviewPic] = useState(null);
  const [picMenu, setPicMenu] = useState(false);
  const [localPic, setLocalPic] = useState(null);
  const [prismoPic, setPrismoPic] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    nickname: "",
  });

  const handleChange = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
    setLocalPic(null)
    setPreviewPic(URL.createObjectURL(newFile));
  };

  const handlePrismoPicChange = (pic) => {
    setLocalPic(pic);
    setFile(null);
    setPreviewPic(pic);
    setPrismoPic(false)
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      if (file) {
        toast.loading("Updating your profile...", { id: "load" });
        await ChangePic(file, user.uid);
      }
      if(localPic){
        toast.loading("Updating your profile...", { id: "load" });
        await ChangeLocalPic(user.uid, localPic)
      }
      if (userData.firstname || userData.lastname || userData.nickname) {
        await ChangeUserData(user.uid, userData);
      }
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
   const MenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3
      },
      display: "flex"
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.3,
      },
      transitionEnd: {
        display: "none"
      }
    }
  };
  const itemStyle = "py-2 px-1 hover:bg-pink-300 transition-all"
  const chooseMenu = () => {
    setPicMenu(false)
    setPrismoPic(true)
  }
  return (
    <>
    <PrismoPics modalState={prismoPic} close={()=>setPrismoPic(false)}  handlePrismoChange={handlePrismoPicChange} />
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
            ) : user.localPic ? (
            <Image
                src={user.localPic}
                fill
                className="rounded-full object-cover"
                alt="localPic"
              /> ) : (
              <Image
                src={user.dpURL || "/jake.jpg"}
                fill
                className="rounded-full object-cover"
                alt="DP"
              />
            )}
          </figure>
          <div className="relative">
            <button 
            onClick={()=>setPicMenu(!picMenu)}
            className="text-sm gap-[2px] py-1 font-medium prismo cursor-pointer hover:scale-105 transition-all flex items-center">
              <Camera size="18" />
              Change Image
            </button>
            <AnimatePresence>
              <motion.div
                initial="exit"
                animate={picMenu ? "enter" : "exit"}
                variants={MenuAnimate}
                className="absolute -bottom-23 bg-white w-full p-1 gap-2 flex-col text-sm"
              >
                <label onClick={chooseMenu} className={itemStyle}>Prismo Pics</label>
                <label onClick={()=>setPicMenu(false)} className={itemStyle} htmlFor="profileID">From Device</label>
              </motion.div>
            </AnimatePresence>

            <input
              id="profileID"
              type="file"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
          </div>
        </section>
        <EditUserData user={user} setData={setUserData} userDatas={userData} />
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
              {
                "bg-prismo hover:bg-prismo":
                  file ||
                  userData.firstname ||
                  userData.lastname ||
                  userData.nickname ||
                  localPic,
              }
            )}
            disabled={
              (!userData.firstname &&
                !userData.lastname &&
                !userData.nickname &&
                !file && !localPic) ||
              loading
            }
          >
            Save
          </Button>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
}
