import React from "react";
import { Box, FloatUp } from "../../variants/variant";
import * as motion from "motion/react-client";
import CardLifeAtMitrphol from "@/components/CardLAMHome";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/dist/client/link";
import HeroSection from "@/components/home/HeroSection";

export default async function Home() {
  // const [quoteEng, setQuoteEng] = useState<string>("");
  // const [quoteTh, setQuoteTh] = useState<string>("");
  // const [imageHero, setImageHero] = useState<string>("");

  let quoteEng = "";
  let quoteTh = "";
  let imageHero = "";

  const fetchTexts = async (section: string, type: string) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/texts?page=home&type=${type}&section=${section}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 600 },
        }
      );
      const data = await response.json();
      quoteEng = data[0].text_en;
      quoteTh = data[0].text;
      return data[0];
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

  const fetchImages = async (section: string) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/images?page=home&section=${section}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 600 },
        }
      );
      const data = await response.json();
      imageHero = data[0].image_url;
      return data[0];
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  try {
    await Promise.all([fetchTexts("hero", "heading"), fetchImages("hero")]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center bg-black">
      <Navbar isAnimate={true} />
      <HeroSection
        quoteTh={quoteTh}
        quoteEng={quoteEng}
        imageHero={imageHero}
      />  
      <div className="relative block w-full max-w-[1536px] h-75 md:h-120 lg:h-140 xl:h-160 z-1 bg-black">
        <div className="w-full flex -z-10 opacity-80">
          <Image
            src="/homeJoinUsBg.png"
            alt="background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <motion.div
          className="flex h-full w-full flex-col max-w-[1536px] cursor-default text-xl md:text-3xl lg:text-4xl xl:text-5xl text-(--color-regal-text) font-bold items-end justify-center"
          variants={Box}
          initial="hidden"
          whileInView="visible"
        >
          <motion.div
            className="relative w-fit right-10 md:right-25 lg:right-35 xl:right-40 flex flex-col max-w-[1536px] cursor-default"
            variants={FloatUp}
            whileInView="visible"
          >
            <h1 className="mb-3 font-extrabold">WHAT WE DO</h1>
            <h1 className="mb-3 font-extrabold">พวกเราทำอะไร</h1>
            <motion.button
              className="p-2 m-2 rounded-md bg-blue-500 text-white cursor-pointer text-sm self-start"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.1 }}
            >
              More About Us
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <div className="relative flex max-w-[1536px] flex-row w-full max-[394px]:h-70 max-[460px]:h-80 md:h-120 lg:h-140 xl:h-160 z-1 bg-black">
        <div className="flex -z-10 opacity-70">
          <Image
            src="/homeLifeBg.png"
            alt="background"
            fill
            className="object-fill"
            priority
          />
        </div>
        <div className="absolute w-full h-full max-w-[1536px] flex flex-row items-center justify-between">
          <motion.div
            className="w-50 min-md:w-80 lg:w-110 bg-red-400 h-full flex flex-row cursor-default text-white justify-center items-center"
            variants={Box}
            initial="hidden"
            whileInView="visible"
          >
            <motion.div
              variants={FloatUp}
              className="flex flex-col w-fit h-fit relative "
            >
              <h1 className="mb-3 font-extrabold italic text-(--color-regal-text2) text-2xl md:text-3xl lg:text-6xl">
                LIFE@MITR
              </h1>
              <h1 className="mb-3 font-semibold text-md lg:text-3xl">
                More Than Work <div></div>
                It's Where You Belong
              </h1>
              <Link href="/why-join">
                <motion.button
                  className="p-2 m-2 rounded-md bg-blue-500 cursor-pointer text-xs lg:text-xl font-bold self-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.1 }}
                >
                  Explore
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex flex-col lg:flex-row w-48.5 min-md:w-125 lg:w-206.5 h-full justify-around items-center my-2 bg-blue-400"
            variants={Box}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 2 }}
          >
            <CardLifeAtMitrphol
              imgSrc="/cardImg.png"
              imgAlt="life1"
              variant={FloatUp}
              className={"w-21 h-20 min-[394px]:w-24 min-[394px]:h-27 min-md:w-40 min-md:h-50 lg:w-50 lg:h-60 min-[394px]:right-20 min-[394px]:top-20 min-md:right-25 min-md:top-30 lg:left-25 lg:top-0"}
              color="red"
              title="Title1"
              content="Sleepppppppppppppppppppppppppppppppppppppppppppaaa"
            />
            <CardLifeAtMitrphol
              imgSrc="/cardImg.png"
              imgAlt="life2"
              variant={FloatUp}
              className={"w-21 h-20 min-[394px]:w-22 min-[394px]:h-24 min-md:w-35 min-md:h-45 lg:w-45 lg:h-55 min-[394px]:left-8 min-[394px]:bottom-17 min-md:left-20 min-md:bottom-35 lg:left-10 lg:bottom-45"}
              color="green"
              title="Title2"
              content="Sleeppppppppppppppppppppppppppppppppppppppaaa"
            />
            <CardLifeAtMitrphol
              imgSrc="/cardImg.png"
              imgAlt="life3"
              variant={FloatUp}
              className={"w-21 h-20 min-[394px]:w-20 min-[394px]:h-23 min-md:w-33 min-md:h-43 lg:w-40 lg:h-50 min-[394px]:left-5 min-[394px]:bottom-17 md:left-17 md:bottom-18"}
              color="blue"
              title="Title3"
              content="Sleeppppppppppppppppppppppppppppppppppppppppaaa"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
