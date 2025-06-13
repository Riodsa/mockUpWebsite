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
      setIsHidden(false);
      setActiveDropdown(null);
    } else setIsHidden(true);
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
    href: string;
    dropdownItems: DropdownItem[];
  }

  interface NavItemDict {
    [key: string]: NavItem;
  }

  const navbarItems = [
    "Home",
    "About Us",
    "Why Join?",
    "Students",
    "Event",
    "Blog",
    "How to Apply",
  ];

  const navbarItemDict: NavItemDict = {
    "Home": {
      label: "Home",
      href: "/",
      dropdownItems: [],
    },
    "About Us": {
      label: "About Us",
      href: "/about",
      dropdownItems: [
        { label: "What we do", href: "/about#what-we-do" },
        { label: "Vision", href: "/about#vision" },
        { label: "Philosophy", href: "/about#philosophy" },
        { label: "Culture", href: "/about#culture" },
        { label: "Award", href: "/about#award" },
      ],
    },
    "Why Join?": {
      label: "Why Join?",
      href: "/why-join",
      dropdownItems: [
        { label: "Life @ Mitrphol", href: "/why-join#life-at-mitrphol" },
        { label: "Team", href: "/why-join#team" },
        { label: "Company Culture", href: "/why-join#career-growth" },
        { label: "Learning", href: "/why-join#learning" },
        { label: "Benefits", href: "/why-join#benefits" },
      ],
    },
    Students: {
      label: "Students",
      href: "/student",
      dropdownItems: [
        { label: "Testimonial", href: "/student#testimonial" },
        { label: "Internships", href: "/student#internships" },
        { label: "Events", href: "/student#events" },
        { label: "FAQs", href: "/student#faqs" },
      ],
    },
    Event: {
      label: "Event",
      href: "/event",
      dropdownItems: [],
    },
    Blog: {
      label: "Blog",
      href: "/blog",
      dropdownItems: [],
    },
    "How to Apply": {
      label: "How to Apply",
      href: "/how-to-apply",
      dropdownItems: [],
    },
  };

  return (
    <motion.div
      className="w-screen h-18 pt-2 flex flex-row pl-2 items-center justify-around fixed z-20"
      animate={{
        backgroundColor: isHidden
          ? "rgba(222,222,222,0)"
          : "rgba(255,255,255,1)",
        color: isHidden ? "white" : "black",
        y: isHidden ? [0] : [-72, 0],
        opacity: isHidden ? [1] : [0, 1],
      }}
      transition={{ duration: 0.4 }}
      onFocusCapture={() => setIsHidden(false)}
      onClick={() => setIsHidden(!isHidden)}
    >
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
        {navbarItems.map((item, i) =>
          navbarItemDict[item].dropdownItems.length > 0 ? (
            <NavbarDropdown
              key={i}
              text={navbarItemDict[item].label}
              href={navbarItemDict[item].href}
              items={navbarItemDict[item].dropdownItems}
              isActive={activeDropdown === navbarItemDict[item].label}
              onActive={() => setActiveDropdown(navbarItemDict[item].label)}
              onClose={closeDropdown}
              isVisible={!isHidden}
            />
          ) : (
            <NavbarItem
              key={i}
              text={navbarItemDict[item].label}
              href={navbarItemDict[item].href}
              onClose={closeDropdown}
            />
          )
        )}
      </div>
      <motion.button
        className="relative right-2 m-3 p-3 rounded-md bg-sky-400 text-white cursor-pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.1 }}
      >
        Find jobs
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
