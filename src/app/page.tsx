import React from "react";
import { Box, FloatUp } from "../variants/variant";
import * as motion from "motion/react-client";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="h-[355vh]">
      <div className="relative w-[100%] h-140">
        <div className="flex flex-col justify-center items-center w-[100%] h-140 bg-blue-400">
          <motion.div
            className="relative flex flex-col bg-amber-300 bottom-0 right-60 cursor-default text-5xl text-white"
            variants={Box}
            initial="hidden"
            whileInView="visible"
          >
            <motion.h1 className="mb-3 font-extrabold" variants={FloatUp}>
              DRIVEN BY INNOVATION <div></div>
              POWERED BY PEOPLE
            </motion.h1>
            <motion.h1 className="mb-3 font-extrabold" variants={FloatUp}>
              ขับเคลื่อนด้วยนวัตกรรม <div></div>
              เติบโตได้เพราะคน
            </motion.h1>
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col justify-center items-center w-[100%] h-140 bg-red-400"
          variants={Box}
          initial="hidden"
          whileInView="visible"
        >
          <motion.div
            className="relative gap-1 flex flex-col bg-amber-300 bottom-20 left-60 cursor-default text-5xl text-white"
            variants={FloatUp}
            initial="hidden"
            whileInView="visible"
          >
            <h1 className="mb-3 font-extrabold">WHAT WE DO</h1>
            <h1 className="mb-3 font-extrabold">พวกเราทำอะไร</h1>
            <button className="p-2 m-2 rounded-md bg-blue-500 cursor-pointer text-sm self-start">
              More About Us
            </button>
          </motion.div>
        </motion.div>
        <motion.div className="flex flex-col justify-center items-center w-[100%] h-140 bg-amber-400" variants={Box} initial="hidden" whileInView="visible">
          <motion.div
            className="relative flex flex-col bg-amber-300 bottom-0 right-60 cursor-default text-5xl text-white"
            variants={FloatUp}
            initial="hidden"
            whileInView="visible"
          >
            <h1 className="mb-3 font-extrabold text-7xl">
              LIFE @ MITR
            </h1>
            <h1 className="mb-3 font-extrabold">
              More Than Work <div></div>
              It's Where You Belong
            </h1>
            <button className="p-2 m-2 rounded-md bg-blue-500 cursor-pointer text-xl self-start">
              Explore
            </button>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
