'use client'
import React from "react";
import { useState } from "react";
import { motion } from "motion/react"


interface NavProps {
  text?: string;
}

const NavbarDropdown = ({ text }: NavProps) => {
    const [isShow, setIsShow] = useState(false)

  return (
    <motion.div
      className="flex flex-row p-3 mr-3 rounded-md cursor-pointer"
      whileHover={{ backgroundColor: "#dedede" }}
      onClick={() => setIsShow(!isShow)}
      onHoverEnd={() => setIsShow(false)}
    >
      <div className="flex right-0 mr-1">{text}</div>
      <motion.img
        src="/dd.png"
        width={20}
        height={0}
        alt="dropdown"
        style={{ objectFit: "contain" }}
        animate={ isShow ? {rotate:180} : {rotate:0}}
      />
    </motion.div>
  );
};

export default NavbarDropdown;
