import { Variants } from "motion/react";
import React from "react";

interface props {
  className?: string;
  variant?: Variants;
  imgSrc?: string;
  imgAlt?: string;
  BGColor: string;
  title: string;
  description: string;
  hyperlink: boolean;
  link?: string;
}

const CardLAMWhyJoin = ({
  className,
  variant,
  imgSrc,
  imgAlt,
  BGColor,
  title,
  description,
  hyperlink,
  link,
}: props) => {
  return (
    <div
      className={`w-250 h-80 rounded-2xl overflow-hidden relative bg-red-400 ${className}`}
    >
      <div className="absolute w-60 h-65 left-20 my-7     rounded-2xl overflow-hidden bg-gray-400"></div>
      <div className="absolute w-140 h-65 left-90 my-7 overflow-hidden bg-amber-400 flex flex-col justify-around items-start">
        <h1 className="indent-4">{title}</h1>
        <p className="indent-4">{description}</p>
        {hyperlink && (
          <a href={link} className="text-white text-sm">
            {link}
          </a>
        )}
      </div>
    </div>
  );
};

export default CardLAMWhyJoin;
