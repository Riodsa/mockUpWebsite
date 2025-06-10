import React from "react";
import Link from "next/link";
import * as motion from "motion/react-client";

interface NavProps {
  text?: string;
  href: string;
}

const NavbarItem = ({ text, href }: NavProps) => {
  return (
    <Link href={`${href}`}>
      <motion.div className="flex right-0 mr-10">{text}</motion.div>
    </Link>
  );
};

export default NavbarItem;
