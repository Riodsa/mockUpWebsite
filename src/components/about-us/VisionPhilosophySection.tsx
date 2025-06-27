'use client'
import { motion, AnimatePresence } from "motion/react";
import SwitchTabButton from "@/components/why-join/SwitchTabButton";
import VisionPhilosophyIcon from "@/components/about-us/VisionPhilosophyIcon";
import Image from "next/image";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";


interface VisionPhilosophySectionProps {
  tab: string[];
  content: {
    [key: string]: string;
  };
  icon: {
    [key: string]: {
      icon: IconDefinition;
      text: string;
    }[];
  };
  background: {
    [key: string]: string;
  };
}

export default function VisionPhilosophySection({
  tab,
  content,
  icon,
  background
}: VisionPhilosophySectionProps) {
  const [activeSection, setActiveSection] = useState<string>("Vision");

  return (
    <div className="flex flex-col">
      <div className="flex flex-row self-center gap-10 z-10">
        {tab.map((item) => (
          <SwitchTabButton
            key={item}
            isActive={activeSection === item}
            onClick={() => setActiveSection(item)}
            label={item}
          />
        ))}
      </div>
      <AnimatePresence>
        {
          tab.map((section) => (
            activeSection === section && (
              <motion.div
                key={section}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-[100%] relative flex flex-col p-20 gap-10 text-shadow-lg">
                  <h1 className="text-4xl font-bold text-(--color-primary-dark-blue) self-center">
                    {section}
                  </h1>
                  <p className="text-2xl font-bold text-(--color-primary-dark-blue) text-center whitespace-pre-line text-shadow-lg">
                    {content[section]}
                  </p>
                  {icon[section] && (
                    <div className="w-fit flex flex-row items-center self-center mt-20 gap-30">
                      {icon[section].map((item, index) => (
                        <VisionPhilosophyIcon
                          key={index}
                          icon={item.icon}
                          text={item.text}
                        />
                      ))}
                    </div>
                  )}
                </div>
                 <div className="absolute inset-0 -z-10">
                  <Image
                    src={background[section]}
                    alt={`${section} Background`}
                    fill={true}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </motion.div>
            )
          ))
        }
      </AnimatePresence>
    </div>
  );
}