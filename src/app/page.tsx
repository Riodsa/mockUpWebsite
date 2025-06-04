import React from "react";
import * as motion from "motion/react-client";

const page = () => {
  return (
    <motion.div
      className="bg-yellow-500 w-25 h-25"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{duration: 0.3}}
      exit={{ opacity: 0, rotate: 180 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, rotate: 15 }}
    ></motion.div>
  );
};

export default page;
