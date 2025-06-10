import React from "react";
import Navbar from "../components/Navbar";
import { textBox, textFloatUp } from "../variants/variant";
import * as motion from "motion/react-client";

const page = () => {
  return (
    <div>
      <Navbar/>
      <div className="relative w-[100%] h-140 bg-red-300">
        <div className="flex flex-col justify-center items-center w-[100%] h-120 bg-blue-400">
          <motion.div
            className="relative flex flex-col bg-amber-300 bottom-10 right-65 cursor-default"
            variants={textBox}
            initial="hidden"
            whileInView="visible"
          >
            <motion.h1
              className="font-extrabold text-5xl text-black mb-2"
              variants={textFloatUp}
            >
              Join us at
            </motion.h1>
            <motion.h1
              className="mb-3 pl-7 text-5xl font-extrabold inline-block bg-gradient-to-r from-regal-blue to-regal-sky text-transparent bg-clip-text"
              variants={textFloatUp}
            >
              Mitrphol Group
            </motion.h1>
            <motion.h2
              className="self-center font-semibold"
              variants={textFloatUp}
            >
              Your Dream Career Awaits
            </motion.h2>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default page;
