import { motion } from "motion/react";

interface CultureCardProps {
    letter: string;
    full: string;
    description: string;
    isExpanded: boolean;
    allClosed: boolean;
    color: string;
    onClick: () => void;
}

//    ${allClosed ?   "w-[20dvw]" : 
//                 `${isExpanded ? "w-[30dvw]" 
//                 : "w-[15dvw]"
//             }` }

const CultureCard = ({ letter, full, description, isExpanded, allClosed, color, onClick }: CultureCardProps) => {
    
    let width = "15vw";
    if (allClosed) width = "20vw";
    else if (isExpanded) width = "35vw";

    return (
        <motion.div onClick={onClick} className="relative h-[60dvh] -ml-6 rounded-2xl p-10 overflow-hidden flex- flex-col content-center"
            style={{ width }}
            animate={{ width }}
            transition={{ type: "spring", stiffness: 200, damping: 30 , duration: 0.5 }}
        >
            <div className={`absolute inset-0 z-0 ${color}`}>
            </div>
            <div className="relative z-10 flex flex-col">
                <div className="flex-row flex text-white font-bold">
                    <h2 className="text-8xl">
                        {letter}
                    </h2>
                    {isExpanded && (
                        <h3 className="text-2xl self-end mb-1">{full.slice(1)}</h3>
                    )}
                </div>
                {isExpanded && (
                    <p className="text-lg font-bold text-white z-10">{description}</p>
                )}
            </div>
          
        </motion.div>
    );
}

// const CultureCard = ({ letter, full, description, isExpanded, allClosed, color, onClick }: CultureCardProps) => {
//     // Determine width based on state
//     let width = "15vw";
//     if (allClosed) width = "20vw";
//     else if (isExpanded) width = "30vw";

//     return (
//         <div
//             onClick={onClick}
//             className={`relative h-[60dvh] -ml-6 rounded-2xl p-10 overflow-hidden flex flex-col content-center`}
//             // style={{ width }}
//             // animate={{ width }}
//             // transition={{ type: "spring", stiffness: 200, damping: 30 }}
//         >
//             <div className={`absolute inset-0 z-0 ${color}`}>
//             </div>
//             <div className="relative z-10 flex flex-col">
//                 <div className="flex-row flex text-white font-bold">
//                     <h2 className="text-8xl">
//                         {letter}
//                     </h2>
//                     {isExpanded && (
//                         <h3 className="text-2xl self-end mb-1">{full.slice(1)}</h3>
//                     )}
//                 </div>
//                 {isExpanded && (
//                     <p className="text-lg font-bold text-white z-10">{description}</p>
//                 )}
//             </div>
//         </div>
//     );
// }

export default CultureCard