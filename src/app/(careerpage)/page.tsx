"use client";
import React, { useEffect, useState } from "react";
import { Box, FloatUp } from "../../variants/variant";
import {motion} from "motion/react";
import CardLifeAtMitrphol from "@/components/CardLAMHome";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/dist/client/link";
import CircularProgress from "@mui/material/CircularProgress";

const page = () => {
  const [quoteEng, setQuoteEng] = useState<string>("");
  const [quoteTh, setQuoteTh] = useState<string>("");
  const [imageHero, setImageHero] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const fetchTexts = async (section: string, type: string) => {
    try {
      const response = await fetch(
        `/api/texts?page=home&type=${type}&section=${section}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "force-cache",
        }
      );
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

  const fetchImages = async (section: string) => {
    try {
      const response = await fetch(`/api/images?page=home&section=${section}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      });
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const result = await fetchTexts("hero", "heading");
      if (result) {
        console.log("Fetched texts:", result);
        setQuoteEng(result.text_en);
        setQuoteTh(result.text);
      }
    };
    const fetchImage = async () => {
      const result = await fetchImages("hero");
      if (result) {
        console.log("Fetched images:", result);
        setImageHero(result.image_url);
      }
    };
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchQuote(), fetchImage()]);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center">
      <Navbar isAnimate={true} />
      <div className="relative w-full flex max-w-screen flex-col h-180 -z-10 bg-black">
        <motion.div className="w-full flex">
          <motion.img
            src={imageHero || "/homeHeroBg.png"}
            alt="background"
            className="object-fill absolute opacity-80"
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </motion.div>
        <motion.div
          className="relative top-50 left-25 w-160 flex flex-col max-w-screen cursor-default text-5xl text-white"
          variants={Box}
          initial="hidden"
          whileInView="visible"
        >
          <motion.h1
            className="mb-3 font-extrabold max-w-[25ch]"
            variants={FloatUp}
          >
            {quoteEng}
          </motion.h1>
          <motion.h1
            className="mb-3 font-extrabold max-w-[20ch]"
            variants={FloatUp}
          >
            {quoteTh}
          </motion.h1>
        </motion.div>
      </div>
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
              <h1 className="mb-3 font-semibold">
                More Than Work <div></div>
                It's Where You Belong
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

export default page;
