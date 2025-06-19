import React from "react";
import { Box, FloatUp } from "../variants/variant";
import * as motion from "motion/react-client";
import CardLifeAtMitrphol from "@/components/CardLifeAtMitrphol";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div className="relative min-h-screen h-420 w-full overflow-hidden flex flex-col items-center">
      <Navbar />
      <div className="absolute inset-0 -z-10 h-140 bg-gradient-to-b from-black to-black/50">
        <Image
          src="/homeHeroBg.png"
          alt="background"
          fill
          className="object-cover -z-10"
          priority
        />
      </div>
      <div className="w-full relative flex max-w-7xl flex-col h-140">
        <motion.div
          className="relative top-50 left-25 w-160 flex flex-col max-w-7xl cursor-default text-5xl text-white text-shadow-amber-300 text-shadow-2xl"
          variants={Box}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h1
            className="mb-3 font-extrabold max-w-[25ch]"
            variants={FloatUp}
          >
            DRIVEN BY INNOVATION POWERED BY PEOPLE
          </motion.h1>
          <motion.h1
            className="mb-3 font-extrabold max-w-[20ch]"
            variants={FloatUp}
          >
            ขับเคลื่อนด้วยนวัตกรรม เติบโตได้เพราะคน
          </motion.h1>
        </motion.div>
      </div>
      <div className="absolute inset-0 -z-10 h-140 mt-140">
        <Image
          src="/homeJoinUsBg.png"
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <motion.div
        className="relative max-w-7xl flex flex-col w-[100%] h-140"
        variants={Box}
        initial="hidden"
        whileInView="visible"
      >
        <motion.div
          className="right-40 top-35 absolute gap-1 flex flex-col cursor-default text-5xl text-(--color-regal-text) font-bold"
          variants={FloatUp}
          initial="hidden"
          whileInView="visible"
        >
          <h1 className="mb-3 font-extrabold">WHAT WE DO</h1>
          <h1 className="mb-3 font-extrabold">พวกเราทำอะไร</h1>
          <motion.button
            className="p-2 m-2 rounded-md bg-blue-500 text-white cursor-pointer text-sm self-start"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1 }}
          >
            More About Us
          </motion.button>
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 h-140 mt-280 bg-black">
        <Image
          src="/homeLifeBg.png"
          alt="background"
          fill
          className="object-fill opacity-100"
          priority
        />
      </div>
      <motion.div
        className="relative flex max-w-7xl flex-row w-[100%] h-140"
        variants={Box}
        initial="hidden"
        whileInView="visible"
      >
        <motion.div
          className="absolute flex flex-col cursor-default text-4xl text-white left-25 top-40"
          variants={FloatUp}
          initial="hidden"
          whileInView="visible"
        >
          <h1 className="mb-3 font-extrabold text-6xl italic pl- text-(--color-regal-text2)">
            {"LIFE @ MITR".split("").map((letter: String, index: number) => (
              <motion.span
                key={index}
                className="inline-block"
                whileHover={{ scale: 1.2, y: -20 }}
                transition={{ duration: 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <h1 className="mb-3 font-semibold">
            More Than Work <div></div>
            It's Where You Belong
          </h1>
          <motion.button className="p-2 m-2 rounded-md bg-blue-500 cursor-pointer text-sm font-bold self-start"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.1 }}>
            Explore
          </motion.button>
        </motion.div>
        <motion.div
          className="flex flex-row w-auto h-full"
          variants={Box}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 2}}
        >
          <CardLifeAtMitrphol
            imgSrc="/cardImg.png"
            imgAlt="life1"
            variant={FloatUp}
            className={"w-60 h-70 right-110 top-40"}
            color="red"
          />
          <CardLifeAtMitrphol
            imgSrc="/cardImg.png"
            imgAlt="life2"
            variant={FloatUp}
            className={"w-45 h-55 right-50 top-20"}
            color="green"
          />
          <CardLifeAtMitrphol
            imgSrc="/cardImg.png"
            imgAlt="life3"
            variant={FloatUp}
            className={"w-45 h-55 right-55 top-80"}
            color="blue"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default page;
