"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import { CardConfig } from "../../../interface";
import CardLAMWhyJoin from "@/components/CardLAMWhyJoin";

export default function CarouselSection({
  lifeAtMitrpholCards,
}: {
  lifeAtMitrpholCards: CardConfig[];
}) {
  return (
    <div
      id="life-at-mitrphol"
      className="w-full h-160 relative flex flex-col justify-center items-center bg-blue-300"
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
          {lifeAtMitrpholCards.map((card: CardConfig, index) => (
            <CarouselItem key={index} className="pl-2">
              <CardLAMWhyJoin
                title={card.title ?? "Default Title"}
                description={card.body ?? "Default Description"}
                link={card.href}
                imgSrc={card.image_url ?? "/default-image.png"}
                imgAlt={"image for LAM card " + (index + 1)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="shadow-lg shadow-black/20 absolute opacity-75 left-40 top-87 cursor-pointer hover:scale-110 hover:opacity-100 transition-all duration-300" />
        <CarouselNext className="shadow-lg shadow-black/20 absolute opacity-75 left-50 top-87 cursor-pointer hover:scale-110 hover:opacity-100 transition-all duration-300" />
      </Carousel>
    </div>
  );
}
