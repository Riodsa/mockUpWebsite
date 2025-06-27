import React from "react";
import * as motion from "motion/react-client"
import {Box,FloatUp} from "../../variants/variant"
import { CardConfig } from "../../../interface";
import CardCG from "../CardCG";

const CGSection = ({ careerGrowthCards } : { careerGrowthCards: CardConfig[] }) => {
  return (
    <div
      id="career-growth"
      className="w-full h-140 pt-20 self-center relative flex flex-col justify-start items-center bg-amber-400"
    >
      <motion.div
        className="flex flex-col justify-start items-center"
        variants={Box}
        initial="hidden"
        whileInView="visible"
      >
        <motion.h1
          className="font-bold tracking-widest text-white text-5xl mb-5"
          variants={FloatUp}
        >
          Career Growth
        </motion.h1>
        <motion.p
          className="font-bold tracking-widest text-white text-xl max-w-[40ch] text-center"
          variants={FloatUp}
        >
          Remember, Work is not a destination but a journey then success will
          follow
        </motion.p>
        <motion.div
          className="w-screen flex flex-row flex-wrap justify-center items-center mt-10"
          variants={Box}
          initial="hidden"
          whileInView="visible"
        >
          {careerGrowthCards.map((card: CardConfig, index) => (
            <CardCG
              key={index}
              iconSrc={card.image_url ?? "/default-icon.png"}
              title={card.title ?? "Default Title"}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CGSection;
