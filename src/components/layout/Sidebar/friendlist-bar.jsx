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

export function FriendListBar() {

  const isMobile = useIsMobile();
  
  if(isMobile){
    return (
    <Sheet>
      <SheetTrigger className="absolute top-3 right-4">
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
  return(
    <section className="w-[500px] bg-white p-4">
      <h1 className="prismo font-semibold mb-3">Friends</h1>
      <div className="flex flex-col gap-3">
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
      </div>
    </section>
  )
  
}
