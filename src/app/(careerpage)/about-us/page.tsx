import BusinessCard from "@/components/about-us/BusinessCard";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import AwardCard from "@/components/about-us/AwardCard";
import Navbar from "@/components/Navbar";
import { CardConfig } from "../../../../interface";
import VisionPhilosophySection from "@/components/about-us/VisionPhilosophySection";
import CultureSection from "@/components/about-us/CultureSection";
import Loading from "@/components/Loading";

const visionPhilosophyTab = [
  'Vision',
  'Philosophy',
];

const visionPhilosophyContent = {
  "Vision" : "เรามุ่งมั่นที่จะเป็นแบบอย่างของธุรกิจที่ให้ความเคารพ\nและแสดงความรับผิดชอบต่อมนุษยชนและสิ่งแวดล้อม",
  "Philosophy" : "เป็นเวลากว่าครึ่งศตวรรษที่ กลุ่มมิตรผล ดำเนินกิจการบนเส้นทางธุรกิจ\nอุตสาหกรรมอ้อยและน้ำตาลเคียงคู่วิถีชีวิตคนไทยภายใต้ปรัชญาการดำเนินงาน"
}

const visionPhilosophyIcon = {
  "Philosophy": [
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
  ],
};

const visionPhilosophyBackground = {
  "Vision": "/mock-vision.png",
  "Philosophy": "/mock-philosophy.png",
};

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

const fetchData = async (path: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/${path}`);
  const data = await res.json();
  return data;
};


export default async function AboutUsPage() {
  const [businessCards, awardCards] = await Promise.all([
    fetchData("business-cards"),
    fetchData("award-cards"),
  ]);

  if (!businessCards || !awardCards) {
    return (
      <div className="flex flex-col items-center w-full">
        <Navbar isAnimate={true} />
        <Loading />
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
          {businessCards.map((card: CardConfig, index: number) => (
            <BusinessCard
              key={index}
              title={card.title || ""}
              description={card.body || ""}
              image={card.image_url || "/placeholder.png"}
            />
          ))}
        </div>
      </div>
      <div
        id="vision&philosophy"
        className="w-[100%] min-h-dvh relative flex flex-col p-20"
      >
       <VisionPhilosophySection
         tab={visionPhilosophyTab}
         content={visionPhilosophyContent}
         icon={visionPhilosophyIcon}
         background={visionPhilosophyBackground}
       />
      </div>
      <div
        id="culture"
        className="bg-blue-800 w-[100%] relative min-h-[120dvh]"
      >
        <CultureSection cultureCards={cultureCards} />
      </div>
      <div
        id="award"
        className="w-[100%] relative min-h-dvh flex flex-col p-20"
      >
        <h1 className="text-4xl font-bold text-(--color-primary-dark-blue) self-center">
          Awards
        </h1>
        <div className="relative flex flex-col justify-center gap-10 mt-10">
          {awardCards.map((card: CardConfig, index: number) => (
            <AwardCard
              key={index}
              number={index}
              title={card.title || ""}
              description={card.body || ""}
              image={card.image_url || "/placeholder.png"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
