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
import FriendRequest from "@/hooks/FriendRequest";
import { storeUser } from "@/hooks/state";
import FriendRequestCard from "./friend-request";
import { useState } from "react";
import { GetUserFriends } from "@/hooks/FetchFriends";

export function FriendListBar() {
  const currentUser = storeUser((state) => state.user);
  const isMobile = useIsMobile();
  const [toggleReq, setToggleReq] = useState(false);
  const { allFriends, loading } = GetUserFriends(currentUser.uid);
  const header = "prismo font-semibold";
  
  const senderProfiles = FriendRequest(currentUser.uid, toggleReq);
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
            <section className="flex flex-col gap-3">
              {loading ? (
                <h1>loading...</h1>
              ) : (
                allFriends.map((friend) => (
                  <div key={friend.uid} className="flex items-center gap-2">
                    <figure className="w-10 h-10 relative">
                      <Image
                        src={
                          friend.localPic
                            ? friend.localPic
                            : friend.dpUrl
                            ? friend.dpUrl
                            : "/jake.jpg"
                        }
                        fill
                        alt="profile_pic"
                        className="object-cover rounded-md"
                      />
                    </figure>
                    <span className="text-[18px] font-semibold">
                      {friend.username}
                    </span>
                  </div>
                ))
              )}
            </section>
          </main>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <section className="md:[250px] lg:w-[300px] xl:w-[350px] h-[100vh] sticky top-0 right-0 bg-white p-4">
      <h1 className={`${header} mb-3`}>Friends</h1>
      <div className="flex flex-col gap-3 mb-6">
        {loading ? (
          <h1>loading...</h1>
        ) : (
          allFriends.map((friend) => (
            <div key={friend.uid} className="flex items-center gap-2">
              <figure className="w-10 h-10 relative">
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
              <span className="text-[18px] font-semibold">
                {friend.username}
              </span>
            </div>
          ))
        )}
      </div>
      <div>
        <h1 className={`${header} mb-1`}> Friend Requests </h1>
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
