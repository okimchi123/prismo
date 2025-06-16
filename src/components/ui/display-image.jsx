import Image from "next/image";

export default function DisplayImage({ img }) {
  return (
    <figure className="w-13 h-13 relative">
      <Image
        src={img}
        fill
        alt="profile_pic"
        className="object-cover rounded-md"
      />
    </figure>
  )
}
