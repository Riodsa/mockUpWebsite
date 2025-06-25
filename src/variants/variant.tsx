export const FloatUp = {
    hidden: {y:50, opacity: 0},
    visible: {y:0, opacity: 1, transition: {duration:0.4}},
    hover: {opacity: 1}
}

export const Box = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1, 
        transition: { 
            duration: 2,
            staggerChildren: 0.35 
        }
    },
    hover: {opacity: 1}
}

export const CardHover = {
    hover: {
        y: "-50",
        transition: {
            duration: 0.35,
            ease: "easeInOut"
        }
    }
}