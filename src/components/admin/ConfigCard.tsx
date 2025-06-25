'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import {motion, AnimatePresence} from "motion/react";
import { Card } from "../../../interface";


interface CardProps {
    path:string
}

const ConfigCard = ({ path }: CardProps) => {
    const [ data, setData ] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/${path}`)
            const data = await res.json()
            setData(data)
        };

        fetchData();
    },[])

    if(data.length === 0) {
        return (
            <div>
                Loading
            </div>
        )
    }

    return (
        <div className="flex flex-wrap relative">
            {
                data.map((card:Card) => (
                    <div className="bg-white shadow-md rounded-lg relative w-60 lg:w-72 h-90 group">
                        <div className="w-full h-[40%] py-10 px-2 mx-4 mt-4">
                            <h2 className="text-3xl font-bold text-(--color-business-blue)">{card.title}</h2>
                        </div>
                        <div className="w-full h-[60%] relative overflow-hidden">
                        <Image
                            src={card.image_url}
                            alt={card.title}
                            sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            className="rounded-b-md"
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default ConfigCard;