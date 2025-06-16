import DisplayImage from "@/components/ui/display-image";

export default function UserPost() {
  return (
    <main className="bg-white p-3 flex flex-col gap-2">
      <header>
        <figure className="flex gap-1">
          <DisplayImage img="/jake.jpg" />
          <div className="flex flex-col">
            <h1 className="text-[14px]">Jake The Dog</h1>
            <p className="text-[12px] prismo">@jakey</p>
            <span className="text-gray-500 text-[13px]">1h</span>
          </div>
        </figure>
      </header>
      <article className="">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </article>
     {/* add icons for like comment share */}
      <footer className="flex gap-3">
        <h1> Like </h1>
        <span>Comment</span>
        <span>Share</span>
      </footer>
    </main>
  );
}
