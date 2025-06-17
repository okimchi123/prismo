import DisplayImage from "@/components/ui/display-image";
import Image from "next/image";

export default function UserPost() {

  const postIcons = [{name:"like", style:"mr-1"},{name:"comment", style:""},{name:"share", style:""}];

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
      <footer className="flex">
        {postIcons.map((icon)=>(
          <Image key={icon.name} src={`/post/${icon.name}.svg`} width="35" height="35" alt={icon.name} className={icon.style} />
        ))

        }
      </footer>
    </main>
  );
}
