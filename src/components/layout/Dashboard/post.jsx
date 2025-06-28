import DisplayImage from "@/components/ui/display-image";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { LikeButton } from "@/components/ui/likeButton";

export default function UserPost({ post, loading, userId }) {
  
  if (loading) return <p>Loading posts...</p>;
  return (
    <main className="bg-white w-full p-3 flex flex-col gap-2">
      <header>
        <figure className="flex gap-1">
          <DisplayImage img="/jake.jpg" />
          <div className="flex flex-col">
            <h1 className="text-[14px]">{post.userName}</h1>
            <p className="text-[12px] prismo">@{post.userUsername}</p>
            <small className="text-gray-500 text-[13px]">
              {formatDistanceToNow(post.createdAt.toDate(), {
                addSuffix: true,
              })}
            </small>
          </div>
        </figure>
      </header>
      <article className="">
        <p>{post.text}</p>
      </article>

      <footer className="flex">
        <LikeButton postId={post.id} userId={userId} currentLikes={post.likes || []} />
        <Image src="/post/comment.svg" height="35" width="35" alt="comment-icon" />
      </footer>
    </main>
  );
}
