"use client";
import { useState, useEffect } from "react";
import { userAuth, logout } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

export default function Page() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const handleLogout = async () => {
    await logout();
    router.push('/?loggedout=true')
  }

  const handleToast = () =>{
    toast('Hello');
  }

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await userAuth()
        setUser(data?.user)
        console.log(data)
      } catch (error) {
        router.push('/')
      }
    }
    loadUser();
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
      <Button onClick={handleToast}> Toast here </Button>
      <Button onClick={handleLogout}>Log out</Button>
    </main>
  );
}
