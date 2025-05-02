import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex flex-col items-center w-full h-screen gap-2">
      <form
        action=""
        className="bg-white mt-[5%] select-none rounded-xl flex flex-col items-center gap-3 p-5"
      >
        <h1 className="text-[22px] font-semibold mb-2">Login</h1>
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
        <button className=" bg-blue-500 w-full rounded-lg py-2 px-5 text-[14px] hover:bg-blue-600 transition-all cursor-pointer text-white ">
          Submit
        </button>
      </form>
      <div className="flex gap-1 items-center text-[14px] text-gray-500">
        <p>Don't have an account?</p>
        <Link href="/register" className=" text-blue-600 hover:underline">
          Sign up now
        </Link>
      </div>
    </main>
  )
}