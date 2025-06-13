import React from "react";
import Link from "next/link";
import * as motion from "motion/react-client";

interface NavProps {
  text?: string;
  href: string | null;
  onClose?: () => void;
  isVisible?: boolean;
}

const NavbarItem = ({ text, href, onClose, isVisible }: NavProps) => {
  return (
    <div className="relative py-2">
      <Link href={`${href}`} onMouseEnter={onClose} className="group">
        <motion.div className="flex right-0 mr-10">{text}</motion.div>
        {isVisible ? 
          <span className="absolute bottom-1 -left-1 w-0 h-0.5 bg-black group-hover:w-[80%] transition-all duration-300 ease-out z-30"></span>
         : 
          <span className="absolute bottom-1 -left-1 w-0 h-0.5 bg-white group-hover:w-[80%] transition-all duration-300 ease-out z-30"></span>
        }
      </Link>
    </div>
  );
};

export default NavbarItem;
