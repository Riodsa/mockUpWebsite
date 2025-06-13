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
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const different = y - lastYRef.current;
    if (Math.abs(different) > 50) {
      if (different > 0) {
        setActiveDropdown(null);
      } else {
      }
      lastYRef.current = y;
    }
    if (y > 50) {
      setIsHidden(true);
      setActiveDropdown(null);
    } else setIsHidden(false);
  });

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  
  interface DropdownItem {
    label: string;
    href: string;
  }

  interface NavItem {
    label: string;
    href: string|null;
    dropdownItems: DropdownItem[];
  }

  interface NavItemDict {
    [key: string]: NavItem;
  }

  const navbarItems = [
    "About Us",
    "Why Join?",
    "Students",
    "Event",
    "Blog",
    "How to Apply",
  ]

  const navbarItemDict: NavItemDict = {
    "About Us": {
      'label' : "About Us",
      'href': '/about-us',
      'dropdownItems': [
        { label: "What we do", href: "/about-us#what-we-do" },
        { label: "Vision", href: "/about-us#vision" },
        { label: "Philosophy", href: "/about-us#philosophy" },
        { label: "Culture", href: "/about-us#culture" },
        { label: "Award", href: "/about-us#award" },
      ],
    },
    "Why Join?": {
      'label' : "Why Join?",
      'href': '/why-join',
      'dropdownItems': [
        { label: "Life @ Mitrphol", href: "/why-join#life@mitrphol" },
        { label: "Team", href: "/why-join#team" },
        { label: "Career Growth", href: "/why-join#career-growth" },
        { label: "Learning", href: "/why-join#learning" },
        { label: "Benefits", href: "/why-join#benefit" },
      ],
    },
    "Students": {
      'label' : "Students",
      'href': '/student',
      'dropdownItems': [
        { label: "My Path to Mitrintern", href: "/student#mitrintern" },
        { label: "Internship FAQs", href: "/student#faq" },
        { label: "Browse Our Internships", href: "/student#internships" },
        { label: "Timeline", href: "/student#timeline" },
        { label: "Scholarship", href: "/student/scholarship"},
        { label: "On Campus", href: "/student/oncampus"},
        { label: "Program", href: "/student/program"}
      ],
    },
    "Event": {
      'label' : "Event",
      'href': null,
      'dropdownItems': [
        { label: "Internal Activities", href: "/event/internal" },
        { label: "Recruitment Activities", href: "/event/recruitment" },
      ],
    },
    "Blog": {
      'label' : "Blog",
      'href': '/blog',
      'dropdownItems': [],
    },
    "How to Apply": {
      'label' : "How to Apply",
      'href': '/how-to-apply',
      'dropdownItems': [],
    },
  }

  return (
    <motion.div
      className="w-screen h-18 flex flex-row pl-2 items-center justify-center fixed z-20"
      animate={{
        backgroundColor: isHidden
          ? "rgba(222,222,222,0.3)"
          : "rgba(255,255,255,1)",
      }}
      transition={{ duration: 0.25 }}
      whileHover={{ backgroundColor: "rgba(255,255,255,1)" }}
      onFocusCapture={() => setIsHidden(false)}
      onClick={() => setIsHidden(false)}
    >
      <Link href="/">
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
         {navbarItems.map((item,i) => (
          navbarItemDict[item].dropdownItems.length > 0 ? 
          <NavbarDropdown
            key={i}
            text={navbarItemDict[item].label}
            href={navbarItemDict[item].href}
            items={navbarItemDict[item].dropdownItems}
            isActive={activeDropdown === navbarItemDict[item].label}
            onActive={() => setActiveDropdown(navbarItemDict[item].label)}
            onClose={closeDropdown}/>
          :
          <NavbarItem
            key={i}
            text={navbarItemDict[item].label}
            href={navbarItemDict[item].href?? "/"}/>
        ))}
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
