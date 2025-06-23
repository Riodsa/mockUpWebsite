"use client";
import Navbar from "@/components/Navbar";
import { motion } from "motion/react";
import CardLAMWhyJoin from "@/components/CardLAMWhyJoin";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Box, FloatUp } from "@/variants/variant";
import CardCG from "@/components/CardCG";
import CardBenefits from "@/components/CardBenefits";

const lifeAtMitrpholCarousels = [
  {
    title: "WORK HARD???",
    description: "Yea here we working like 24/7",
    hyperlink: false,
    link: "",
    BGColor: "green",
  },
  {
    title: "WORK HARD???",
    description: "Yea here we working like 24/7",
    hyperlink: false,
    link: "",
    BGColor: "green",
  },
  {
    title: "WORK HARD???",
    description:
      "Yea here we working like 24/7Yea here we working like 24/7Yea here we working like 24/7Yea here we working like 24/7Yea here we working like 24/7Yea here we working like 24/7Yea here we working like 24/7Yea here we working like 24/7",
    hyperlink: true,
    link: "https://www.google.com",
    BGColor: "green",
  },
  {
    title: "WORK HARD???",
    description: "Yea here we working like 24/7",
    hyperlink: false,
    link: "",
    BGColor: "green",
  },
  {
    title: "WORK HARD???",
    description: "Yea here we working like 24/7",
    hyperlink: false,
    link: "",
    BGColor: "red",
  },
];

export default function WhyJoinPage() {
  return (
    <div className="flex flex-col  items-center w-full">
      <Navbar isAnimate={false} />
      <div className="relative w-full overflow-hidden flex flex-col items-center bg-white cursor-default">
        <div
          id="life-at-mitrphol"
          className="w-full h-160 relative flex flex-col justify-center items-center bg-red-300"
        >
          <motion.h1
            className="absolute top-24 font-bold tracking-widest text-white text-5xl"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            LIFE AT MITRPHOL
          </motion.h1>
          <Carousel
            opts={{ loop: true, align: "start", dragFree: false }}
            className="relative top-5 self-center w-330 max-w-7xl"
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent className="ml-30">
              {lifeAtMitrpholCarousels.map((_, index) => (
                <CarouselItem key={index} className="pl-2">
                  <CardLAMWhyJoin
                    title={_.title + " - " + (index + 1)}
                    description={_.description}
                    hyperlink={_.hyperlink}
                    link={_.link}
                    BGColor={_.BGColor}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute opacity-75 left-35 top-87 cursor-pointer hover:scale-110 hover:opacity-100 transition-all duration-300" />
            <CarouselNext className="absolute opacity-75 left-45 top-87 cursor-pointer hover:scale-110 hover:opacity-100 transition-all duration-300" />
          </Carousel>
        </div>
        <div className="w-full relative flex">
          <motion.div
            className="w-full h-140 pt-20 self-center relative flex flex-col justify-start items-center bg-amber-400"
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
              Remember, Work is not a destination but a journey then success
              will follow
            </motion.p>
            <div className="w-screen flex flex-row flex-wrap justify-center items-center mt-10">
              <CardCG iconSrc="/iconMock.png" title="Learn" />
              <CardCG iconSrc="/iconMock.png" title="Work" />
              <CardCG iconSrc="/iconMock.png" title="Grow" />
            </div>
          </motion.div>
        </div>
        <div className="w-full h-170 py-10 bg-sky-200 flex flex-col justify-center items-center">
          <div>
            <motion.div
              className="gap-x-4 w-240 grid grid-cols-3 pl-20 pr-10"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, duration: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div variants={FloatUp} key={index}>
                  <CardBenefits
                    iconSrc="/iconMock.png"
                    title={`Benefits ${index + 1}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
