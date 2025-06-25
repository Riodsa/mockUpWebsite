"use client";
import Navbar from "@/components/Navbar";
import { motion } from "motion/react";
import { Card } from "../../../../interface";
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
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function WhyJoinPage() {
  // Use useState to manage the fetched data
  const [careerGrowthCards, setCareerGrowthCards] = useState([]);
  const [lifeAtMitrpholCards, setLifeAtMitrpholCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCareerGrowthCards = async () => {
    try {
      const response = await fetch("/api/career-growth-cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const data = await response.json();
      setCareerGrowthCards(data);
      console.log("Fetched career growth cards:", data);
    } catch (error) {
      console.error("Error fetching career growth cards:", error);
    }
  };

  const fetchLifeAtMitrpholCards = async () => {
    try {
      const response = await fetch("/api/life-at-mitrphol-cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const data = await response.json();
      setLifeAtMitrpholCards(data);
      console.log("Fetched life at mitrphol cards:", data);
    } catch (error) {
      console.error("Error fetching life at mitrphol cards:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchCareerGrowthCards(),
          fetchLifeAtMitrpholCards(),
        ]);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full">
        <Navbar isAnimate={false} />
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar isAnimate={false} />
      <div className="relative w-full overflow-hidden flex flex-col items-center bg-white cursor-default">
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
              {lifeAtMitrpholCards.map((card: Card, index) => (
                <CarouselItem key={index} className="pl-2">
                  <CardLAMWhyJoin
                    title={card.title}
                    description={card.body}
                    link={card.href}
                    imgSrc={card.image_url}
                    imgAlt={"image for LAM card " + (index + 1)}
                    BGColor="#4ADE80"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="shadow-lg shadow-black/20 absolute opacity-75 left-40 top-87 cursor-pointer hover:scale-110 hover:opacity-100 transition-all duration-300" />
            <CarouselNext className="shadow-lg shadow-black/20 absolute opacity-75 left-50 top-87 cursor-pointer hover:scale-110 hover:opacity-100 transition-all duration-300" />
          </Carousel>
        </div>
        <div className="w-full relative flex">
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
                Remember, Work is not a destination but a journey then success
                will follow
              </motion.p>
              <motion.div
                className="w-screen flex flex-row flex-wrap justify-center items-center mt-10"
                variants={Box}
                initial="hidden"
                whileInView="visible"
              >
                {careerGrowthCards.map((card: Card, index) => (
                  <CardCG
                    key={index}
                    iconSrc={card.image_url}
                    title={card.title}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
