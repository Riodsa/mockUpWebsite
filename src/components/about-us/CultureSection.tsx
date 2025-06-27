'use client'
import CultureCard from "./CultureCard";
import { useState, useEffect } from "react";

interface CultureSectionProps {
  cultureCards: {
    letter: string;
    full: string;
    description: string;
    color: string;
  }[];
}

export default function CultureSection({ cultureCards }: CultureSectionProps) {
    
  const [activeCultureCard, setActiveCultureCard] = useState<number | null>(null);
  const [allClosed, setAllClosed] = useState<boolean>(true);

  const handleCultureCardClick = (index: number) => {
    setActiveCultureCard(activeCultureCard === index ? null : index);
  };

  useEffect(() => {
    setAllClosed(activeCultureCard === null);
  }, [activeCultureCard]);


  return (
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
  );
}
