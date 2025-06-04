import React from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import { color } from "motion";

interface NavProps {
  text?: string;
}

const NavbarItem = ({ text }: NavProps) => {
  return (
    <Link href={`/${text}`}>
      <motion.div className="flex right-0 mr-10">{text}</motion.div>
    </Link>
  );
};

export default NavbarItem;
