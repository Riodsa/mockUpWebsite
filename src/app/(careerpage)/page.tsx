import React from "react";
import { Box, FloatUp } from "../../variants/variant";
import * as motion from "motion/react-client"
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
      const response = await fetch(`${process.env.BACKEND_URL}/api/images?page=home&section=${section}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 600 },
      });
      const data = await response.json();
      imageHero = data[0].image_url;
      return data[0];
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  try{
    await Promise.all([fetchTexts("hero", "heading"), fetchImages("hero")]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center">
      <Navbar isAnimate={true} />
      <HeroSection
        quoteTh={quoteTh}
        quoteEng={quoteEng}
        imageHero={imageHero}
      />
      <div className="relative w-full flex max-w-screen flex-col h-180 z-1 bg-black">
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
          className="flex h-full w-full flex-col max-w-screen cursor-default text-5xl text-(--color-regal-text) font-bold items-end justify-center"
          variants={Box}
          initial="hidden"
          whileInView="visible"
        >
          <motion.div
            className="relative w-85 right-40 flex flex-col max-w-screen cursor-default text-5xl"
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
      <div className="relative flex max-w-screen flex-row w-full h-180 z-1 bg-black">
        <div className="flex -z-10 opacity-70">
          <Image
            src="/homeLifeBg.png"
            alt="background"
            fill
            className="object-fill"
            priority
          />
        </div>
        <div className="w-full flex flex-row items-center">
          <motion.div
            className="relative left-25 h-fit flex flex-col cursor-default text-4xl text-white  "
            variants={Box}
            initial="hidden"
            whileInView="visible"
          >
            <motion.div variants={FloatUp}>
              <h1 className="mb-3 font-extrabold text-6xl italic text-(--color-regal-text2)">
                LIFE@MITR
              </h1>
              <h1 className="mb-3 font-semibold whitespace-pre-line">
                {"More Than Work\n It's Where You Belong"}
              </h1>
              <Link href="/why-join">
                <motion.button
                  className="p-2 m-2 rounded-md bg-blue-500 cursor-pointer text-sm font-bold self-start"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.1 }}
                >
                  Explore
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative left-80 flex flex-row h-fit"
            variants={Box}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 2 }}
          >
            <CardLifeAtMitrphol
              imgSrc="/cardImg.png"
              imgAlt="life1"
              variant={FloatUp}
              className={"w-60 h-70 right-20"}
              color="red"
              title="Title1"
              content="Sleepppppppppppppppppppppppppppppppppppppppppppaaa"
            />
            <CardLifeAtMitrphol
              imgSrc="/cardImg.png"
              imgAlt="life2"
              variant={FloatUp}
              className={"w-45 h-55 right-5 bottom-30"}
              color="green"
              title="Title2"
              content="Sleeppppppppppppppppppppppppppppppppppppppaaa"
            />
            <CardLifeAtMitrphol
              imgSrc="/cardImg.png"
              imgAlt="life3"
              variant={FloatUp}
              className={"w-45 h-55 right-55 top-35"}
              color="blue"
              title="Title3"
              content="Sleeppppppppppppppppppppppppppppppppppppppppaaa"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
