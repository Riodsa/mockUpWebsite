import React from "react";
import Image from "next/image";
import NavbarDropdown from "./NavbarDropdown";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import * as motion from "motion/react-client";

const Navbar = () => {
  return (
    <div className="top-0 bg-white w-screen h-18 m-0 flex flex-row pl-2 items-center justify-center">
      <Link href="/home">
        <Image
          src="/logo.png"
          alt="logo"
          width={175}
          height={0}
          style={{ objectFit: "contain" }}
          className="ml-10"
        />
      </Link>
      <div className="flex flex-row self-center ml-35 items-center">
        <NavbarDropdown text="About Us"/>
        <NavbarDropdown text="Why Join?"/>
        <NavbarDropdown text="Students"/>
        <NavbarItem text="Event" />
        <NavbarItem text="Blog" />
        <NavbarItem text="How to Apply" />
      </div>
      <motion.button
        className="relative left-10 m-3 p-3 rounded-md bg-sky-400 text-white cursor-pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.1 }}
      >
        Find jobs
      </motion.button>
    </div>
  );
};

export default Navbar;
