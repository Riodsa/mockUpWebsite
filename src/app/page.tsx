import React from "react";
import Navbar from "./components/Navbar";

const page = () => {
  return (
    <div>
      <div className="flex justify-center mb-20">
        <Navbar />
      </div>
      <div className="relative w-screen h-140 bg-red-300">
        <div className="flex flex-col justify-center items-center w-screen h-100 bg-blue-400">
          <div className="relative flex flex-col justify-center items-center bg-amber-300 bottom-20">
            <h1 className="font-extrabold text-4xl text-blue-500">Join us!</h1>
            <p className="font-medium text-xl">
              Join our journey to become one of Mitrphol family
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
