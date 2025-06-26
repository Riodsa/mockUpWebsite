"use client";
import BusinessCard from "@/components/BusinessCard";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SwitchTabButton from "@/components/SwitchTabButton";
import PhilosophyIcon from "@/components/PhilosophyIcon";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import AwardCard from "@/components/AwardCard";
import CultureCard from "@/components/CultureCard";
import Navbar from "@/components/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import { CardConfig } from "../../../../interface";

// const cards = [
//   {
//     title: "Business 1",
//     description: "Description for Business 1",
//     image: "/mock-business.avif",
//   },
//   {
//     title: "Business 2",
//     description: "Description for Business 2",
//     image: "/mock-business.avif",
//   },
//   {
//     title: "Business 3",
//     description: "Description for Business 3",
//     image: "/mock-business.avif",
//   },
//   {
//     title: "Business 4",
//     description: "Description for Business 4",
//     image: "/mock-business.avif",
//   },
//   {
//     title: "Business 5",
//     description: "Description for Business 5",
//     image: "/mock-business.avif",
//   },
//   {
//     title: "Business 6",
//     description: "Description for Business 6",
//     image: "/mock-business.avif",
//   },
// ];

const tab = [
  { label: "Vision", value: "vision" },
  { label: "Philosophy", value: "philosophy" },
];

const visionContent =
  "เรามุ่งมั่นที่จะเป็นแบบอย่างของธุรกิจที่ให้ความเคารพ\nและแสดงความรับผิดชอบต่อมนุษยชนและสิ่งแวดล้อม";
const philosophyContent =
  "เป็นเวลากว่าครึ่งศตวรรษที่ กลุ่มมิตรผล ดำเนินกิจการบนเส้นทางธุรกิจ\nอุตสาหกรรมอ้อยและน้ำตาลเคียงคู่วิถีชีวิตคนไทยภายใต้ปรัชญาการดำเนินงาน";

const philosophyIcon = [
  {
    icon: faCircleUser,
    text: "Philosophy 1",
  },
  {
    icon: faCircleUser,
    text: "Philosophy 2",
  },
  {
    icon: faCircleUser,
    text: "Philosophy 3",
  },
  {
    icon: faCircleUser,
    text: "Philosophy 4",
  },
];

const cultureCards = [
  {
    letter: "M",
    full: "Mastery",
    description: "มองภาพใหญ่ มองให้ลึก มองให้ไกล",
    color: "bg-red-500",
  },
  {
    letter: "I",
    full: "Innovation",
    description: "คิดต่าง คิดสร้างสรรค์ ลงมือทำให้เกิดขึ้นจริง",
    color: "bg-blue-500",
  },
  {
    letter: "T",
    full: "Trustworthiness",
    description: "ยึดมั่นในคุณธรรม ทำในสิ่งที่ถูกต้อง",
    color: "bg-green-500",
  },
  {
    letter: "R",
    full: "Resilience",
    description: "ทำทันทีด้วยความเร็วและคล่องตัว",
    color: "bg-yellow-500",
  },
];

// const mockAwardCards = [
//   {
//     title: "Award 1 Award 1 Award 1",
//     description:
//       "คนเดินเท้าเบียดเสียดร่มกันไปมาด้วยอารมณ์ไม่ดีทั่วไป และเสียหลักที่มุมถนน ซึ่งคนเดินเท้าอีกหลายหมื่นคนลื่นไถลมาตั้งแต่เช้า (ถ้าวันนี้เคยมีเช้า) เพิ่มตะกอนใหม่ลงบนเปลือกโคลนหนาๆ ติดแน่นอยู่ที่จุดเหล่านั้นบนทางเท้า และสะสมด้วยดอกเบี้ยทบต้น",
//     image: "/mock-award.png",
//   },
//   {
//     title: "Award 2",
//     description: "Description for Award 2",
//     image: "/mock-award.png",
//   },
//   {
//     title: "Award 3",
//     description: "Description for Award 3",
//     image: "/mock-award.png",
//   },
// ];

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState<string>("vision");
  const [activeCultureCard, setActiveCultureCard] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [businessCards, setBusinessCards] = useState<any[]>([]);
  const [awardCards, setAwardCards] = useState<any[]>([]);
  const [allClosed, setAllClosed] = useState<boolean>(true);

  const fetchBusinessCards = async () => {
    try {
      const response = await fetch("/api/business-cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const data = await response.json();
      setBusinessCards(data);
    } catch (error) {
      console.error("Error fetching business cards:", error);
    }
  };

  const fetchAwardCards = async () => {
    try {
      const response = await fetch("/api/award-cards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 600 }
      });
      const data = await response.json();
      setAwardCards(data);
    } catch (error) {
      console.error("Error fetching award cards:", error);
    }
  };

  const handleCultureCardClick = (index: number) => {
    setActiveCultureCard(activeCultureCard === index ? null : index);
  };

  useEffect(() => {
    setAllClosed(activeCultureCard === null);
  }, [activeCultureCard]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchBusinessCards(), fetchAwardCards()]);
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
        <Navbar isAnimate={true} />
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="z-0 relative flex flex-col">
      <Navbar isAnimate={true} />
      <div
        id="what-we-do"
        className="bg-green-400 w-[100%] min-h-dvh relative flex flex-col p-20 pt-30 justify-center items-center gap-10"
      >
        <h1 className="text-5xl font-bold text-white">Our Businesses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {businessCards.map((card: CardConfig, index) => (
            <BusinessCard
              key={index}
              title={card.title}
              description={card.body}
              image={card.image_url}
            />
          ))}
        </div>
      </div>
      <div
        id="vision&philosophy"
        className="w-[100%] min-h-dvh relative flex flex-col p-20"
      >
        <div className="flex flex-row self-center gap-10 z-10">
          {tab.map((item) => (
            <SwitchTabButton
              key={item.value}
              isActive={activeSection === item.value}
              onClick={() => setActiveSection(item.value)}
              label={item.label}
            />
          ))}
        </div>
        <AnimatePresence>
          {activeSection === "vision" && (
            <motion.div
              key="vision"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-[100%] relative flex flex-col p-20 gap-10 text-shadow-lg">
                <h1 className="text-4xl font-bold text-(--color-primary-dark-blue) self-center">
                  Vision
                </h1>
                <p className="text-2xl font-bold text-(--color-primary-dark-blue) text-center whitespace-pre-line text-shadow-lg">
                  {visionContent}
                </p>
              </div>
              <div className="absolute inset-0 -z-10">
                <Image
                  src="/mock-vision.png"
                  alt="Vision Background"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          )}
          {activeSection === "philosophy" && (
            <motion.div
              key="philosophy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-[100%] relative flex flex-col p-20 gap-10 text-shadow-lg">
                <h1 className="text-4xl self-center font-bold text-(--color-primary-dark-blue)">
                  Philosophy
                </h1>
                <p className="text-2xl font-bold text-(--color-primary-dark-blue) text-center whitespace-pre-line">
                  {philosophyContent}
                </p>
                <div className="w-fit flex flex-row items-center self-center mt-20 gap-30">
                  {philosophyIcon.map((item, index) => (
                    <PhilosophyIcon
                      key={index}
                      icon={item.icon}
                      text={item.text}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-red-100 absolute inset-0 -z-10">
                <Image
                  src="/mock-philosophy.png"
                  alt="Philosophy Background"
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        id="culture"
        className="bg-blue-800 w-[100%] relative min-h-[120dvh]"
      >
        <div className="flex flex-col justify-center items-center p-20 gap-20">
          <h1 className="text-4xl font-bold text-white self-center">Culture</h1>
          <div className="flex flex-row relative">
            {cultureCards.map((card, index) => (
              <CultureCard
                key={index}
                letter={card.letter}
                full={card.full}
                description={card.description}
                color={card.color}
                isExpanded={activeCultureCard === index}
                allClosed={allClosed}
                onClick={() => handleCultureCardClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        id="award"
        className="w-[100%] relative min-h-dvh flex flex-col p-20"
      >
        <h1 className="text-4xl font-bold text-(--color-primary-dark-blue) self-center">
          Awards
        </h1>
        <div className="relative flex flex-col justify-center gap-10 mt-10">
          {awardCards.map((card: CardConfig, index) => (
            <AwardCard
              key={index}
              number={index}
              title={card.title}
              description={card.body}
              image={card.image_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
