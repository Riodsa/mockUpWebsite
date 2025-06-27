import React from "react";
import * as motion from "motion/react-client";
import { Box, FloatUp } from "@/variants/variant";

type heroSectionProps = {
  quoteEng: string;
  quoteTh: string;
  imageHero: string;
};

export default function HeroSection({ quoteEng, quoteTh, imageHero }: heroSectionProps) {
  return (
    <div className="relative w-full flex max-w-screen flex-col h-180 -z-10 bg-black">
      <motion.div className="w-full flex">
        <motion.img
          src={imageHero || "/homeHeroBg.png"}
          alt="background"
          className="object-fill absolute opacity-80"
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 15, ease: "linear" }}
        />
      </motion.div>
      <motion.div
        className="relative top-45 left-25 w-160 flex flex-col max-w-screen cursor-default text-5xl text-white"
        variants={Box}
        initial="hidden"
        whileInView="visible"
      >
        <motion.h1
          className="mb-3 font-extrabold max-w-[25ch]"
          variants={FloatUp}
        >
          {quoteEng}
        </motion.h1>
        <motion.h1
          className="mb-3 font-extrabold max-w-[20ch]"
          variants={FloatUp}
        >
          {quoteTh}
        </motion.h1>
      </motion.div>
    </div>
  );
};

