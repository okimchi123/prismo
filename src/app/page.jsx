"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import Loading from "@/components/Loading";

export default function Page() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        form.email,
        form.password
      );
      if (!userCredential?.user) {
        toast.error("invalid credentials");
        return;
      }
      const token = await userCredential.user.getIdToken();
      document.cookie = `__session=${token}; path=/; max-age=3600`;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <main className="flex flex-col items-center w-full h-screen gap-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white mt-[30%] sm:mt-[10%] md:mt-[5%] select-none rounded-xl flex flex-col items-center gap-3 p-5"
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
        <Button className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </Button>
      </form>
      <div className="flex gap-1 select-none items-center text-[14px] text-gray-500">
        <p>Don't have an account?</p>
        <Link
          href="/register"
          className={`${buttonVariants({ variant: "outline" })}`}
        >
          Sign up now
        </Link>
      </div>
    </main>
  );
}
