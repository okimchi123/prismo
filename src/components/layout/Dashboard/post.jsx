import DisplayImage from "@/components/ui/display-image";
import Image from "next/image";

export default function UserPost({post, loading}) {
  
  const postIcons = [{name:"like", style:"mr-1"},{name:"comment", style:""},{name:"share", style:""}];
  if(loading) return <p>Loading posts...</p>
  return ( 
    <main className="bg-white w-full p-3 flex flex-col gap-2">
      <header>
        <figure className="flex gap-1">
          <DisplayImage img="/jake.jpg" />
          <div className="flex flex-col">
            <h1 className="text-[14px]">{post.userName}</h1>
            <p className="text-[12px] prismo">@{post.userUsername}</p>
            <span className="text-gray-500 text-[13px]">1h</span>
          </div>
        </figure>
      </header>
      <article className="">
        <p>
          {post.text}
        </p>
      </article>

      <footer className="flex">
        {postIcons.map((icon)=>(
          <Image key={icon.name} src={`/post/${icon.name}.svg`} width="35" height="35" alt={icon.name} className={icon.style} />
        ))

        }
      </footer>
    </main>
  );
}
