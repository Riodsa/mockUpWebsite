import Navbar from "@/components/Navbar";
import CarouselSection from "@/components/why-join/CarouselSection";
import CGSection from "@/components/why-join/CGSection";

export default async function WhyJoinPage() {
  // Use useState to manage the fetched data
  // const [careerGrowthCards, setCareerGrowthCards] = useState([]);
  // const [lifeAtMitrpholCards, setLifeAtMitrpholCards] = useState([]);
  let LAMCards: any[] = [];
  let careerGrowthCards: any[] = [];

  const fetchCareerGrowthCards = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/career-growth-cards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 600 },
        }
      );
      const data = await response.json();
      careerGrowthCards = data;
      // console.log("Fetched career growth cards:", data);
    } catch (error) {
      console.error("Error fetching career growth cards:", error);
    }
  };

  const fetchLifeAtMitrpholCards = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/life-at-mitrphol-cards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 600 },
        }
      );
      const data = await response.json();
      LAMCards = data;
    } catch (error) {
      console.error("Error fetching life at mitrphol cards:", error);
    }
  };

  try {
    await Promise.all([fetchCareerGrowthCards(), fetchLifeAtMitrpholCards()]);
  } catch (error) {
    console.error("Error fetching cards:", error);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar isAnimate={false} />
      <div className="relative w-full overflow-hidden flex flex-col items-center bg-white cursor-default">
        <CarouselSection lifeAtMitrpholCards={LAMCards} />
        <div className="w-full relative flex">
          <CGSection careerGrowthCards={careerGrowthCards} />
        </div>
      </div>
    </div>
  );
}
