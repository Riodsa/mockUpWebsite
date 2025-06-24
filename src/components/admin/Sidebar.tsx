import Image from "next/image";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="fixed w-60 z-10 left-0 flex flex-col  items-center">
      <div className="w-full flex flex-col text-black text-2xl justify-center items-start gap-20 mt-20 ml-10">
        <button className="px-4 py-2 rounded flex flex-row justify-between items-center">
          <FaHome className="mr-2" />
          Home
        </button>
        <button className="px-4 py-2 rounded  flex flex-row justify-between items-center">
          <FaPeopleGroup className="mr-2" />
          About us
        </button>
        <button className="px-4 py-2 rounded flex flex-row justify-between items-center">
          <FaQuestion className="mr-2" />
          Why join us
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
