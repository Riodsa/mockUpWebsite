import React from "react";
import * as motion from "motion/react-client";
import { Box, FloatUp } from "@/variants/variant";

type heroSectionProps = {
  quoteEng: string;
  quoteTh: string;
  imageHero: string;
};

const HeroSection = ({ quoteEng, quoteTh, imageHero }: heroSectionProps) => {
  return (
    <div className="relative w-full flex max-w-[1536px] flex-col max-[394px]:h-70 max-[460px]:h-80 md:h-120 lg:h-180 bg-black">
      <motion.div className="overflow-hidden absolute max-w-[1536px] w-screen top-0 left-0 max-[394px]:h-70 max-[460px]:h-80 md:h-120 lg:h-180 flex flex-col items-center">
        <motion.img
          src={imageHero || "/homeHeroBg.png"}
          alt="background"
          className="object-fill absolute opacity-80"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.4 }}
          transition={{ duration: 15, ease: "linear" }}
        />
      </motion.div>
      <motion.div
        className="relative top-22 left-15  lg:top-40 lg:left-25 md:top-40 md:left-25 flex flex-col max-w-[1536px] cursor-default text-xl md:text-3xl lg:text-4xl xl:text-5xl text-white"
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

export default HeroSection;
