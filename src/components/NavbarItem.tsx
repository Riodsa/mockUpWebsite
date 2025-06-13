import React from "react";
import Link from "next/link";
import * as motion from "motion/react-client";

interface NavProps {
  text?: string;
  href: string;
  onClose?: () => void;
}

const NavbarItem = ({ text, href, onClose}: NavProps) => {
  return (
    <Link href={`${href}`} onMouseEnter={onClose}>
      <motion.div className="flex right-0 mr-10">{text}</motion.div>
    </Link>
  );
};

export default NavbarItem;
