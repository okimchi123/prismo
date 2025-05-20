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

export function FriendListBar() {
  return (
    <Sheet>
      <SheetTrigger>
        <Image src="/friends.svg" width="20" height="20" alt="icon" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="prismo">Friends</SheetTitle>
        </SheetHeader>
        <main className="px-4">
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <figure className="w-10 h-10 relative">
                <Image
                  src="/jake.jpg"
                  fill
                  alt="profile_pic"
                  className="object-cover rounded-md"
                />
              </figure>
              <span className="text-[18px] font-semibold">Jake The Dog</span>
            </div>
            <div className="flex items-center gap-2">
              <figure className="w-10 h-10 relative">
                <Image
                  src="/jake.jpg"
                  fill
                  alt="profile_pic"
                  className="object-cover rounded-md"
                />
              </figure>
              <span className="text-[18px] font-semibold">Jake The Dog</span>
            </div>
          </section>
        </main>
      </SheetContent>
    </Sheet>
  );
}
