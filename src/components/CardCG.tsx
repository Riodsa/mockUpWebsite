import React from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { FloatUp } from "@/variants/variant";

type CardCGProps = {
  iconSrc: string;
  title: string;
};

const CardCG = ({ iconSrc, title }: CardCGProps) => {
  return (
    <div className="relative w-70 h-60 flex flex-col justify-center items-center">
      <motion.div
        className="relative rounded-full mb-2 border-none overflow-hidden"
        variants={FloatUp}
        initial={{ opacity: 1, y: 0, rotate: 0 }}
        whileHover={{
          scale: [1, 1.1, 1.1, 1],
          y: [0, -20, -20, 0],
          rotate: [0, 10, -10, 0],
          transition: { duration: 0.6, repeat: Infinity, repeatDelay: 0.15 },
        }}
      >
        <Image src={iconSrc} alt={title} width={150} height={150} priority />
      </motion.div>
      <h1 className="relative text-lg font-bold">{title}</h1>
    </div>
  );
};

export default CardCG;
