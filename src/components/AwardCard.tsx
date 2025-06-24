import { number } from "motion";
import Image from "next/image";

interface AwardCardProps {
    number: number;
    title: string;
    description: string;
    image: string;
}

const AwardCard = ({ number, title, description, image }: AwardCardProps) => {
    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-3 w-[70dvw] max-w-[100%] gap-10 justify-center self-center" key={number}>
           <div className={`relative col-span-1 lg:col-span-2 rounded-2xl overflow-hidden flex aspect-square lg:aspect-auto
            ${number % 2 === 0 ? "order-1" : "order-2 place-content-end"}`}> 
                {/* <div className={`absolute bg-white w-[60%] h-[70%] z-10  bottom-2 
                ${number % 2 === 0 ? "rotate-60 -left-[25%]" : "-rotate-60 -right-[25%]"}`}>

                </div> */}
                <div className={`border-y-transparent -top-10 absolute z-10 border-y-[70dvw]
                ${number % 2 === 0 ? "border-l-(--color-primary-dark-blue) border-l-[40dvw]" : "border-r-(--color-primary-dark-blue) border-r-[40dvw] right-0"}`}></div>

                <h2 className="text-2xl text-white font-bold z-20 self-end mb-6 mx-6 max-w-[20%]">
                    {title}
                </h2>
                <Image src={image} alt={title} fill={true} style={{ objectFit: "cover" }} className=""/>
            </div>
            <div className={`relative bg-(--color-secondary-brown) p-4 rounded-2xl content-center aspect-square justify-center
            ${number % 2 === 0 ? "order-2" : "order-1"}`}>
                <p className="text-white">{description}</p>
            </div>
        </div>
    );
};

export default AwardCard;
