'use client'
import BusinessCard from "@/components/BusinessCard"
import { useState, useEffect } from "react"
import { usePathname,useSearchParams } from 'next/navigation';

const cards = [
    {
        title: "Business 1",
        description: "Description for Business 1",
        image: "/mock-business.avif"
    },
    {
        title: "Business 2",
        description: "Description for Business 2",
        image: "/mock-business.avif"
    },
    {
        title: "Business 3",
        description: "Description for Business 3",
        image: "/mock-business.avif"
    },
    {
        title: "Business 4",
        description: "Description for Business 4",
        image: "/mock-business.avif"
    },
    {
        title: "Business 5",
        description: "Description for Business 5",
        image: "/mock-business.avif"
    },
    {
        title: "Business 6",
        description: "Description for Business 6",
        image: "/mock-business.avif"
    }
]   

export default function AboutUsPage() {
    const [activeSection, setActiveSection] = useState<string>("vision");
    const pathName = usePathname();
    const param = useSearchParams();

    useEffect(()=>{
       const hash = pathName.split('#')[1] || window.location.hash.replace('#', '');
        if (hash === 'vision') {
            setActiveSection('vision');
        } else if (hash === 'philosophy') {
            setActiveSection('philosophy');
        }
  }, [pathName]);

    console.log(pathName)

    return (
        <div className="z-0 relative flex flex-col">
            <div id='what-we-do' className="bg-green-400 w-[100%] relative flex flex-col p-20 pt-30 justify-center items-center gap-10">
                <h1 className="text-5xl font-bold text-white">Our Businesses</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    {cards.map((card, index) => (
                        <BusinessCard
                            key={index}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                        />
                    ))}
                </div>
            </div>
            <div id='vision' className="w-[100%] relative h-dvh flex flex-col p-20">

            </div>
            <div id='philosophy' className="w-[100%] relative h-dvh">Philosophy</div>
            <div id='culture' className="w-[100%] relative h-dvh">Culture</div>
            <div id='award' className="w-[100%] relative h-dvh">Award</div>

        </div>
    )
}