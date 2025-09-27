"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import useFriendRequest from "@/hooks/FriendRequest";
import { storeUser } from "@/hooks/state";
import FriendRequestCard from "./friend-request";
import { useState } from "react";
import { GetUserFriends } from "@/hooks/FetchFriends";
import {
  Ellipsis,
  CircleUser,
  MessageCircleMore,
} from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Message from "./Message";

export function FriendListBar() {
  const currentUser = storeUser((state) => state.user);
  const [chatModal, setChatModal] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({});
  const isMobile = useIsMobile();
  const [toggleReq, setToggleReq] = useState(false);
  const { allFriends, loading } = GetUserFriends(currentUser?.uid);
  const header = "prismo font-semibold";
  const [hover, setHover] = useState("");
  const router = useRouter();

  const handleViewUser = (username) => {
    router.push(username);
  };
  
  const selectUser = (user) => {
    setSelectedFriend(user)
    setChatModal(true)
  }
  
  const closeChat = () => {
    setSelectedFriend({})
    setChatModal(false)
  }

  const senderProfiles = useFriendRequest(currentUser?.uid, toggleReq);
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger className="fixed z-101 top-4 right-3">
          <Image src="/friends.svg" width="23" height="23" alt="icon" />
        </SheetTrigger>
        <SheetContent className="z-104">
          <SheetHeader>
            <SheetTitle className="prismo">Friends</SheetTitle>
          </SheetHeader>
          <main className="px-4">
            {chatModal && <Message currentUser={currentUser} chatUser={selectedFriend} close={closeChat} />}
            <section className="flex flex-col border gap-3 mb-5">
              {loading ? (
          <h1>loading...</h1>
        ) : (
          allFriends.map((friend) => (
            <div
              key={friend.uid}
              className="flex gap-2 w-full relative items-center pr-3"
            >
              <div 
              onClick={()=>selectUser(friend)}
              className="flex items-center w-[70%] gap-1 pr-3 cursor-pointer hover:bg-gray-200 transition-all rounded-sm">
                <figure className="w-8 h-8 relative">
                  <Image
                    src={
                      friend.dpUrl
                        ? friend.dpUrl
                        : friend.localPic
                        ? friend.localPic
                        : "/jake.jpg"
                    }
                    fill
                    alt="profile_pic"
                    className="object-cover rounded-md"
                  />
                </figure>
                <span className="text-[14px] font-regular">
                  {friend.username}
                </span>
              </div>
              <div
                onMouseEnter={() => setHover(friend.username)}
                onMouseLeave={() => setHover("")}
                className={clsx("absolute right-0 flex gap-3", {
                  "p-1": hover !== friend.username,
                  "py-1 pl-4 pr-8": hover === friend.username,
                })}
              >
                {hover !== friend.username ? (
                  <Ellipsis size="22" className="" />
                ) : (
                  <>
                    <button 
                    onClick={()=>selectUser(friend)}
                    className="cursor-pointer">
                      <MessageCircleMore size="22" color="green" />
                    </button>
                    <button 
                    onClick={()=>handleViewUser(friend.username.toLowerCase())}
                    className="cursor-pointer">
                      <CircleUser size="22" color="blue" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
            </section>
            <div>
        <h1 className={`${senderProfiles.length ? "prismo" : "text-gray-300"} font-semibold  mb-1`}> Friend Requests </h1>
        <div className="flex flex-col gap-1">
          {senderProfiles.map((user) => (
            <FriendRequestCard
              fromUser={user}
              toUser={currentUser}
              key={user.uid}
              setToggle={setToggleReq}
            />
          ))}
        </div>
      </div>
          </main>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <section className="md:[250px] lg:w-[300px] xl:w-[350px] h-[100vh] select-none sticky top-0 right-0 bg-white p-4">
    {chatModal && <Message currentUser={currentUser} chatUser={selectedFriend} close={closeChat} />}  
      <h1 className={`${header} mb-3`}>Friends</h1>
      <div className="flex flex-col gap-3 mb-6">
        {loading ? (
          <h1>loading...</h1>
        ) : (
          allFriends.map((friend) => (
            <div
              key={friend.uid}
              className="flex gap-2 w-full relative items-center pr-3"
            >
              <div 
              onClick={()=>selectUser(friend)}
              className="flex items-center w-[70%] gap-1 pr-3 cursor-pointer hover:bg-gray-200 transition-all rounded-sm">
                <figure className="w-8 h-8 relative">
                  <Image
                    src={
                      friend.dpUrl
                        ? friend.dpUrl
                        : friend.localPic
                        ? friend.localPic
                        : "/jake.jpg"
                    }
                    fill
                    alt="profile_pic"
                    className="object-cover rounded-md"
                  />
                </figure>
                <span className="text-[14px] font-regular">
                  {friend.username}
                </span>
              </div>
              <div
                onMouseEnter={() => setHover(friend.username)}
                onMouseLeave={() => setHover("")}
                className={clsx("absolute right-0 flex gap-3", {
                  "p-1": hover !== friend.username,
                  "py-1 pl-4 pr-8": hover === friend.username,
                })}
              >
                {hover !== friend.username ? (
                  <Ellipsis size="22" className="" />
                ) : (
                  <>
                    <button 
                    onClick={()=>selectUser(friend)}
                    className="cursor-pointer hover:scale-110 transition-all">
                      <MessageCircleMore size="22" color="green" />
                    </button>
                    <button 
                    onClick={()=>handleViewUser(friend.username.toLowerCase())}
                    className="cursor-pointer hover:scale-110 transition-all">
                      <CircleUser size="22" color="blue" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <h1 className={`${senderProfiles.length ? "prismo" : "text-gray-300"} font-semibold  mb-1`}> Friend Requests </h1>
        <div className="flex flex-col gap-1">
          {senderProfiles.map((user) => (
            <FriendRequestCard
              fromUser={user}
              toUser={currentUser}
              key={user.uid}
              setToggle={setToggleReq}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
