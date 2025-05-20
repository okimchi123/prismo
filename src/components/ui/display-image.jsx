import Image from "next/image";

export default function DisplayImage({ img }) {
  return (
    <figure className="w-14 h-14 relative">
      <Image
        src={img}
        fill
        alt="profile_pic"
        className="object-cover rounded-md"
      />
    </figure>
  )
}
