import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
export default function Page() {
  return (
    <main className="flex flex-col items-center w-full h-screen gap-2">
      <form
        action=""
        className="bg-white mt-[5%] select-none rounded-xl flex flex-col items-center gap-3 p-5"
      >
        <h1 className="text-[22px] mb-2">Register Now</h1>
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          type="text"
          name="firstname"
          placeholder="First Name"
          required
        />
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          type="text"
          name="lastname"
          placeholder="Last Name"
          required
        />
        <input
          className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <div className="w-full relative">
          <input
            className="border border-gray-400 py-3 pl-3 pr-5 rounded-md text-[12px]"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <Button className="w-full">
          Submit
        </Button>
      </form>
      <Link href="/" className={`${buttonVariants({ variant: "outline" })}`}>
        Go to Login
      </Link>
    </main>
  );
}
