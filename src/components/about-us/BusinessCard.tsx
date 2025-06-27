'use client'

import Image from "next/image";
import { useState } from "react";
import {motion, AnimatePresence} from "motion/react";


interface CardProps {
    title: string;
    description: string;
    image: string;
}

const BusinessCard = ({ title, description, image }: CardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="bg-white shadow-md rounded-lg relative w-60 lg:w-72 h-90 overflow-hidden"
            whileHover={{ scale: 1.05 , opacity: 1,}}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="w-full h-[40%] py-10 px-2 mx-4 mt-4">
                <h2 className="text-3xl font-bold text-(--color-business-blue)">{title}</h2>
            </div>
            <div className="w-full h-[60%] relative overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    className="rounded-b-md"
                />
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute inset-0 flex justify-center bg-(--color-business-blue) p-4 rounded-b-md"
                            initial={{ opacity: 0, x: 100}} // Start below and invisible
                            animate={{ opacity: 0.9, x: 0 }} // Slide up and become visible
                            exit={{ opacity: 0, x: 100 }} // Slide down and fade out
                            transition={{ duration: 0.3 , ease: 'easeOut' }}
                        >
                            <p className="text-white text-start w-full">{description}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default BusinessCard;