"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavProps {
  text?: string; // title of dropdown
  href?: string | null; // link for new page
  items?: DropdownItem[]; // list of dropdown item
  isActive?: boolean; // use for control dropdown
  isVisible?: boolean; // use for changing image while transparent
  setActive?: () => void; // force to active dropdown
  setClose?: () => void; // force to close dropdown
}

const NavbarDropdown = ({
  text,
  href,
  items = [],
  isActive = false,
  setActive,
  setClose,
  // isVisible,
}: NavProps) => {
  return (
    <div className="relative group" onMouseLeave={setClose}>
      <Link
        href={`${href}`}
        className={`cursor-default`}
        onClick={(e) => {
          if (!href) {
            e.preventDefault();
            setActive?.();
          }
        }}
      >
        <motion.div
          className={`flex flex-row p-2 mr-3 rounded-md ${href ? "cursor-pointer" : " "} group`}
          onMouseEnter={setActive}
        >
          <div className="p-0 m-0 flex right-0 mr-1" onClick={setClose}>
            {text}
          </div>
          <motion.img
            src={"/ddWhite.png"}
            width={20}
            height={0}
            alt="dropdown"
            style={{ objectFit: "contain" }}
            animate={isActive ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          />
          <span className="absolute bottom-1 left-1 w-0 h-0.5 bg-white group-hover:w-[65%] transition-all duration-300 ease-out"></span>
        </motion.div>
      </Link>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-full left-0 bg-white shadow-lg rounded-sm border border-gray-200 min-w-48 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={setClose}
          >
            {items.map((item, index) => (
              <Link key={index} href={item.href} onClick={setClose}>
                <motion.div className="px-4 py-3 hover:bg-gray-300 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0">
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarDropdown;
