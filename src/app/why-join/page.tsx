import Navbar from "@/components/Navbar";
import * as motion from "motion/react-client";
import CardLAMWhyJoin from "@/components/CardLAMWhyJoin";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const lifeAtMitrpholCards = [
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
    description: "Yea here we working like 24/7",
    hyperlink: false,
    link: "",
    BGColor: "red",
  },
];

export default function WhyJoinPage() {
  return (
    <div className="relative min-h-screen h-420 w-full overflow-hidden flex flex-col items-center bg-green-300 cursor-default">
      <Navbar isAnimate={false} />
      <div className="w-full h-140 relative flex flex-col justify-center items-center bg-red-300">
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
          className="relative top-14 self-center w-330"
        >
          <CarouselContent className="ml-30">
            {lifeAtMitrpholCards.map((_, index) => (
              <CarouselItem key={index} className="-pl-100">
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
          <CarouselPrevious className="absolute opacity-75 left-70 top-87 cursor-pointer hover:scale-110 hover:opacity-100 transition-all duration-300" />
          <CarouselNext className="absolute opacity-75 left-80 top-87 cursor-pointer hover:scale-110 hover:opacity-100 transition-all duration-300" />
        </Carousel>
      </div>
    </div>
  );
}
