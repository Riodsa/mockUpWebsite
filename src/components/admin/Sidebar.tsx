'use client'
import Image from "next/image";
import React from "react";
import { JSX } from "react";
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const handleLogout = async () => {
    try {
      await signOut({ redirect: true }); 
      //   router.push('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const buttons: string[] = [
    "Home",
    "About us",
    "Why join"
  ];

  const icons: { [key: string]: JSX.Element } = {
    "Home": <FaHome />,
    "About us": <FaPeopleGroup />,
    "Why join": <FaQuestion />
  }

  return (
    <div className="fixed h-[100dvh] w-60 z-10 left-0 py-20 flex flex-col items-center border-r-2 border-black/50">
      <div className="w-fit h-full flex flex-col text-black text-2xl mx-5 relative justify-between">
        <div className="flex flex-col gap-20"> 
          {buttons.map((button, index) => (
            <Link href={`/admin/${button.toLowerCase().replace(" ", "-")}`} className="w-fit" key={index}>
              <button className="px-4 py-3 w-45 hover:bg-gray-200 rounded-2xl flex flex-row justify-start items-center cursor-pointer">
                {icons[button]}
                <p className="ml-2">{button}</p>
              </button>
            </Link>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white w-fit py-2 px-4 rounded-md hover:bg-red-600 transition-colors relative self-center cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
