'use client'
import "@/styles/globals.css";
import { inter } from "@/components/ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function RootLayout({ children }) {

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user:", user)  
        if (pathname === "/" || pathname === "/register") {
          router.push("/dashboard"); 
          console.log("eyowwwww")
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
