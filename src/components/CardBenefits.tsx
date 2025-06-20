import React from "react";
import Image from "next/image";
import * as motion from "motion/react-client";

type CardProps = {
  iconSrc: string;
  title: string;
};

const CardBenefits = ({ iconSrc, title }: CardProps) => {
  return (
    <motion.div
      className="self-center w-60 m-1 mb-3 h-40 flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg shadow-black/20"
      whileHover={{ y: -7, scale: 1.05, transition: { duration: 0.3 } }}
    >
      <div>
        <Image
          src={iconSrc}
          alt={title}
          width={100}
          height={100}
          priority
          className="mb-2"
        />
      </div>
      <h1 className="text-lg font-bold">{title}</h1>
    </motion.div>
  );
};

export default CardBenefits;
