'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "../../../interface";

interface ConfigCardProps extends Card {
    path: string;
}


const ConfigCard = ({ title, image_url, body, href, is_active, path }: ConfigCardProps) => {

    return (
        <div className="flex flex-wrap relative">
            <div className="bg-gray-300 shadow-xl rounded-lg w-40 lg:w-52 h-70">
                <div className="w-fit h-[40%] px-2 mx-4 mt-4">
                    <h2 className="text-xl w-fit font-bold text-black">{title}</h2>
                </div>
                <div className="w-full h-[60%] relative overflow-hidden">
                    <Image
                        src={image_url}
                        alt={title}
                        // sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        className="rounded-b-md"
                    />
                </div>
            </div>
        </div>
    );
}

export default ConfigCard;