import Image from "next/image";
import { Cube } from "./3D/cube";

export default function Loading() {
  return (
    <div className="flex flex-col items-center mt-[40%] sm:mt-[20%] md:mt-[10%] h-screen">
      <Cube />
    </div>
  );
}
