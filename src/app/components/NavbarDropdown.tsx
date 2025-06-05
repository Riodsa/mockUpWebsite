"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavProps {
  text?: string;
  items?: DropdownItem[];
  isActive?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
}

const NavbarDropdown = ({
  text,
  items = [],
  isActive = false,
  onToggle,
  onClose,
}: NavProps) => {
  return (
    <div className="relative">
      <motion.div
        className="flex flex-row p-3 mr-3 rounded-md cursor-pointer"
        whileHover={{ backgroundColor: "#dedede" }}
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
      >
        <div className="flex right-0 mr-1">{text}</div>
        <motion.img
          src="/dd.png"
          width={20}
          height={0}
          alt="dropdown"
          style={{ objectFit: "contain" }}
          animate={isActive ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-full left-0 bg-white shadow-lg rounded-md border border-gray-200 min-w-48 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item, index) => (
              <Link key={index} href={item.href} onClick={onClose}>
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
