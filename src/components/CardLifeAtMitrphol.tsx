import React from 'react'
import { Variants } from "framer-motion";
import * as motion from "motion/react-client";

interface props {
    className?: string,
    variant?: Variants,
}

const CardLifeAtMitrphol = ({ className, variant }: props) => {
  return (
    <motion.div className={`flex flex-col rounded-2xl z-2 absolute ${className}`}
    variants={variant}>
    </motion.div>
  )
}

export default CardLifeAtMitrphol