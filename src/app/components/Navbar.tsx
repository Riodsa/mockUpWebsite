"use client";
import React, { useState } from "react";
import Image from "next/image";
import NavbarDropdown from "./NavbarDropdown";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import * as motion from "motion/react-client";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef } from "react";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll()
  const lastYRef= useRef(0);

  useMotionValueEvent(scrollY , 'change' , (y) => {
    const different = y - lastYRef.current
    if(Math.abs(different) > 50){
      if(different > 0){
        setIsHidden(true)
        setActiveDropdown(null)
      }
      else{
        setIsHidden(false)
      }
      lastYRef.current = y;
    }
  })

  const handleDropdownToggle = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const dropdownItems = {
    "About Us": [
      { label: "What we do", href: "/about#what-we-do" },
      { label: "Vision", href: "/about#vision" },
      { label: "Philosophy", href: "/about#philosophy" },
      { label: "Culture", href: "/about#culture" },
      { label: "Award", href: "/about#award" },
    ],
    "Why Join?": [
      { label: "Life @ Mitrphol", href: "/why-join#life-at-mitrphol" },
      { label: "Team", href: "/why-join#team" },
      { label: "Company Culture", href: "/why-join#career-growth" },
      { label: "Learning", href: "/why-join#learning" },
      { label: "Benefits", href: "/why-join#benefits" },
    ],
    "Students": [
      { label: "Testimonial", href: "/students#testimonial" },
      { label: "Internships", href: "/students#internships" },
      { label: "Events", href: "/students#events" },
      { label: "FAQs", href: "/students#faqs" },
    ],
  };

  return (
    <motion.div className="rounded-full top-2 bg-white w-[97%] h-18 m-0 flex flex-row pl-2 items-center justify-center fixed"
      animate = {isHidden ? "hidden" : "visible"}
      whileHover="visible"
      onFocusCapture={() => setIsHidden(false)}
      variants={{
        hidden : {
          y : "-94.5%"
        },
        visible : {
          y : "0%"
        }
      }}
      onClick={() => setIsHidden(!isHidden)}>
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
        <NavbarDropdown
          text="About Us"
          items={dropdownItems["About Us"]}
          isActive={activeDropdown === "About Us"}
          onToggle={() => handleDropdownToggle("About Us")}
          onClose={closeDropdown}
        />
        <NavbarDropdown
          text="Why Join?"
          items={dropdownItems["Why Join?"]}
          isActive={activeDropdown === "Why Join?"}
          onToggle={() => handleDropdownToggle("Why Join?")}
          onClose={closeDropdown}
        />
        <NavbarDropdown
          text="Students"
          items={dropdownItems["Students"]}
          isActive={activeDropdown === "Students"}
          onToggle={() => handleDropdownToggle("Students")}
          onClose={closeDropdown}
        />
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
    </motion.div>
  );
};

export default Navbar;
