"use client";
import React, { useState } from "react";
import { Variants } from "framer-motion";
import { motion } from "motion/react";
import Image from "next/image";

interface props {
  className?: string;
  variant?: Variants;
  imgSrc: string;
  imgAlt: string;
  color?: string;
}

const CardLifeAtMitrphol = ({
  className,
  variant,
  imgSrc,
  imgAlt,
  color,
}: props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      className={`flex flex-col rounded-2xl z-2 absolute overflow-hidden ${className}`}
      variants={variant}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-0 bottom-1/5 rounded-t-2xl">
        <Image src={imgSrc} alt={imgAlt} style={{ objectFit: "cover" }} fill />
      </div>
      <motion.div
        className={`absolute top-4/5 inset-0 rounded-b-2xl overflow-hidden h-2/5 w-auto flex flex-col pl-4 bg-${color}-500`}
        animate={isHover ? { y: "-60%" } : { y: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-white text-[1em] font-bold mt-[7%]"
          initial={{ opacity: 0, marginBottom: 16 }}
          animate={{ opacity: 1, marginBottom: isHover ? 4 : 16 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          Header
        </motion.h1>
        <p className="text-white text-[0.3em]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CardLifeAtMitrphol;
