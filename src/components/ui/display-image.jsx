import Image from "next/image";

export function DisplayImage({ img }) {
  return (
    <figure className="w-13 h-13 relative">
      <Image
        src={img}
        fill
        alt="profile_pic"
        className="object-cover rounded-md"
      />
    </figure>
  );
}
export function SmallDisplayImg({ img }) {
  return (
    <figure className="w-11 h-11 relative">
      <Image
        src={img}
        fill
        alt="profile_pic"
        className="object-cover rounded-md"
      />
    </figure>
  );
}
export function CommentImage({ img }) {
  return (
    <figure className="w-10 h-10 relative">
      <Image
        src={img}
        fill
        className="rounded-full object-cover"
        alt="pic"
      />
    </figure>
  );
}
