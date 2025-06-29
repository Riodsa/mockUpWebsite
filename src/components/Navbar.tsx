"use client";
import React, { useState } from "react";
import Image from "next/image";
import NavbarDropdown from "./NavbarDropdown";
import NavbarItem from "./NavbarItem";
import Link from "next/link";
import * as motion from "motion/react-client";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useEffect } from "react";

const Navbar = ({ isAnimate }: { isAnimate: boolean }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!isAnimate) return;
    const different = y - lastYRef.current;
    if (Math.abs(different) > 50) {
      if (different > 0) {
        setActiveDropdown(null);
      } else {
      }
      lastYRef.current = y;
    }
    if (y >= 200) {
      setIsHidden(false);
      setActiveDropdown(null);
      setIsActive(true);
    } else if (y >= 100) {
      setIsActive(false);
    } else if (y >= 0) {
      setIsHidden(true);
      setIsActive(true);
    }
  });

  useEffect(() => {
    if (!isAnimate) {
      setIsHidden(false);
      setIsActive(true);
      setActiveDropdown(null);
    } else if (scrollY.get() == 0) {
      setIsHidden(true);
      setIsActive(true);
      setActiveDropdown(null);
    }
  }, []);

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  interface DropdownItem {
    label: string;
    href: string;
  }

  interface NavItem {
    label: string;
    href: string | null;
    dropdownItems: DropdownItem[];
  }

  interface NavItemDict {
    [key: string]: NavItem;
  }

  const navbarItems = [
    "About Us",
    "Why Join?",
    // "Students",
    // "Event",
    // "Blog",
    // "How to Apply",
  ];

  const navbarItemDict: NavItemDict = {
    "About Us": {
      label: "About Us",
      href: "/about-us",
      dropdownItems: [
        { label: "What we do", href: "/about-us#what-we-do" },
        { label: "Vision & Philosophy", href: "/about-us#vision&philosophy" },
        { label: "Culture", href: "/about-us#culture" },
        { label: "Award", href: "/about-us#award" },
      ],
    },
    "Why Join?": {
      label: "Why Join?",
      href: "/why-join",
      dropdownItems: [
        { label: "Life @ Mitrphol", href: "/why-join#life@mitrphol" },
        // { label: "Team", href: "/why-join#team" },
        { label: "Career Growth", href: "/why-join#career-growth" },
        // { label: "Learning", href: "/why-join#learning" },
        // { label: "Benefits", href: "/why-join#benefit" },
      ],
    },
    // "Students": {
    //   'label' : "Students",
    //   'href': '/student',
    //   'dropdownItems': [
    //     { label: "My Path to Mitrintern", href: "/student#mitrintern" },
    //     { label: "Internship FAQs", href: "/student#faq" },
    //     { label: "Browse Our Internships", href: "/student#internships" },
    //     { label: "Timeline", href: "/student#timeline" },
    //     { label: "Scholarship", href: "/student/scholarship"},
    //     { label: "On Campus", href: "/student/oncampus"},
    //     { label: "Program", href: "/student/program"}
    //   ],
    // },
    // "Event": {
    //   'label' : "Event",
    //   'href': null,
    //   'dropdownItems': [
    //     { label: "Internal Activities", href: "/event/internal" },
    //     { label: "Recruitment Activities", href: "/event/recruitment" },
    //   ],
    // },
    // Blog: {
    //   label: "Blog",
    //   href: "/blog",
    //   dropdownItems: [],
    // },
    // "How to Apply": {
    //   label: "How to Apply",
    //   href: "/how-to-apply",
    //   dropdownItems: [],
    // },
  };

  return (
    <motion.div
      className="w-full max-w-screen h-18 pt-2 flex flex-row pl-2 self-center items-center justify-around fixed z-20 mb-18"
      initial={{
        backgroundColor: "rgba(255,255,255,0)",
        color: "white",
        y: 0,
        opacity: [1, 0],
      }}
      animate={{
        backgroundColor: isHidden ? "transparent" : "rgba(56,189,248,1)",
        color: "white",
        y: isHidden ? [0] : [-72, 0],
        opacity: isActive ? (isHidden ? [0, 1] : [0, 1]) : 0,
      }}
      transition={{ duration: 0.6 }}
    >
      <Link href="/">
        <Image
          src={"/logoWhite.png"}
          alt="logo"
          width={75}
          height={0}
          style={{ objectFit: "contain" }}
          className="ml-10 relative bottom-1"
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
              setActive={() => setActiveDropdown(navbarItemDict[item].label)}
              setClose={closeDropdown}
              isVisible={!isHidden}
            />
          ) : (
            <NavbarItem
              key={i}
              text={navbarItemDict[item].label}
              href={navbarItemDict[item].href}
              onClose={closeDropdown}
              isVisible={!isHidden}
            />
          )
        )}
      </div>
      <motion.button
        className="relative right-2 m-3 p-3 rounded-md cursor-pointer"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.1 }}
        animate={{
          backgroundColor: isHidden ? "transparent" : "white",
          color: isHidden ? "white" : "rgba(56,189,248,1)",
          border: isHidden ? "1px solid rgba(255,255,255,1)" : "none",
        }}
      >
        <Link href="/job">Find jobs</Link>
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
