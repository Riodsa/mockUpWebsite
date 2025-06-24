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
  title: string;
  content: string;
}

const CardLifeAtMitrphol = ({
  className,
  variant,
  imgSrc,
  imgAlt,
  color,
  title,
  content,
}: props) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      className={`flex flex-col rounded-2xl relative z-5 overflow-hidden ${className} cursor-default`}
      variants={variant}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="absolute inset-0 bottom-1/5 rounded-t-2xl -z-10">
        <Image
          src={imgSrc}
          alt={imgAlt}
          style={{ objectFit: "cover" }}
          fill
          className="rounded-t-2xl"
        />
      </div>
      <motion.div
        className={`@container relative top-[80%] rounded-b-2xl w-full flex flex-col pl-4 ${color ? `bg-${color}-600` : "black"}`}
        animate={
          isHover ? { height: "150%", y: "-30%" } : { height: "100%", y: 0 }
        }
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-white text-[13cqw] font-bold mt-[3%] break-all max-w-[10ch]"
          initial={{ opacity: 0, marginBottom: 50 }}
          animate={{ opacity: 1, marginBottom: isHover ? 1.5 : 50 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {title}
        </motion.h1>
        <p className="mr-2 font-semibold text-white text-[8cqw] break-all">
          {content}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CardLifeAtMitrphol;
