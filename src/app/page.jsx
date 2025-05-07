'use client'

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login, userAuth } from '@/services/auth';

export default function Page() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isToast = useRef(false);
  
  const handleChange = (e) =>{
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(user)
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{

    // const checkAuth = async () => {
    //   try {
    //     const res = await userAuth(); 
    //     if (res?.user) {
    //       router.replace('/dashboard');
    //     }
    //   } catch (err) {
    //   }
    // };

    // checkAuth();

    if(!isToast.current && searchParams.get('loggedout')==='true'){
      toast.success('Logged out successfully!')
      isToast.current = true;

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('loggedout');

      const newUrl = `${window.location.pathname}?${newParams.toString()}`;
      router.replace(newUrl, { scroll: false });
    }

  },[searchParams])

  return (
    <main className="flex flex-col items-center w-full h-screen gap-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-[5%] select-none rounded-xl flex flex-col items-center gap-3 p-5"
      >
        <h1 className="text-[22px] font-semibold mb-2">Login</h1>
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <div className="w-full relative">
          <input
            className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
          
        </div>
        <Button className=" w-full">
          Submit
        </Button>
      </form>
      <div className="flex gap-1 select-none items-center text-[14px] text-gray-500">
        <p>Don't have an account?</p>
        <Link href="/register" className={`${buttonVariants({ variant: "outline" })}`}>
          Sign up now
        </Link>
      </div>
    </main>
  )
}