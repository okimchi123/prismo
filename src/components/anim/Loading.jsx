import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";

export default function LoadingSpinner({ loading }) {
  const radius = 15;

  const angle = useMotionValue(0);

  useAnimationFrame((t) => {
    const rotation = (t / 1000) * 360;
    angle.set(rotation);
  });
  
  const radians = useTransform(angle, (deg) => (deg * Math.PI) / 180);
  const x = useTransform(radians, (a) => radius * Math.cos(a));
  const y = useTransform(radians, (a) => radius * Math.sin(a));

  return (
    <div className="fixed z-1000 flex items-start right-6 bottom-6 rounded-md bg-white h-[50px] w-[355px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
       <motion.div
        style={{
          x,
          y,
          rotate: angle,
          width: 5,
          height: 10,
          backgroundColor: "#3b82f6",
          position: "absolute",
          borderRadius:10,
        }}
        className="top-5 left-6 "
      />
      <motion.div
        style={{
          x,
          y,
          rotate: angle,
          width: 5,
          height: 10,
          backgroundColor: "#3b82f6",
          position: "absolute",
          borderRadius:10,
        }}
        className="top-5 left-6 "
      />
    </div>
  );
}
