'use client'
import Image from "next/image";
import React from "react";
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

  return (
    <div className="h-[90%] top-5 min-w-60 max-w-60 z-10 left-0 flex flex-col items-center border-r-2 border-black/50">
      <div className="w-fit flex flex-col text-black text-2xl gap-20 mt-20 ml-10">
        <Link href="/admin/home" className="w-fit">
          <button className="px-4 py-2 w-fit rounded flex flex-row justify-between items-center cursor-pointer">
            <FaHome className="mr-2" />
            Home
          </button>
        </Link>
        <Link href="/admin/about-us" className="w-fit">
          <button className="px-4 py-2 w-fit rounded flex flex-row justify-between items-center cursor-pointer">
            <FaPeopleGroup className="mr-2" />
            About us
          </button>
        </Link>
        <Link href="/admin/why-join" className="w-fit">
          <button className="px-4 py-2 w-fit rounded flex flex-row justify-between items-center cursor-pointer">
            <FaQuestion className="mr-2" />
            Why join
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
