import Link from "next/link";
import { Variants } from "motion/react";
import React from "react";
import Image from "next/image";

interface props {
  className?: string;
  variant?: Variants;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
  link?: string;
}

const CardLAMWhyJoin = ({
  className,
  // variant,
  imgSrc,
  imgAlt,
  title,
  description,
  link,
}: props) => {
  return (
    <div
      className={`w-250 h-80 rounded-2xl overflow-hidden relative bg-[#6879ED] ${className}`}
    >
      <div className="absolute w-60 h-65 left-20 my-7 rounded-2xl overflow-hidden bg-gray-200">
        <Image src={imgSrc} alt={imgAlt} layout="fill" objectFit="cover" />
      </div>
      <div className="absolute w-140 h-65 left-90 my-7 overflow-hidden flex flex-col justify-start items-start">
        <h1 className="pl-4 text-2xl font-bold mt-5">{title}</h1>
        <p className="pl-4 mt-5">{description}</p>
        {link ? (
          <Link href={link || ""} target="_blank" className="mt-5">
            <button className="ml-4 text-white text-md px-2 py-2 bg-sky-400 rounded-md transition-all duration-300 hover:scale-110 cursor-pointer">
              Explore
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default CardLAMWhyJoin;
