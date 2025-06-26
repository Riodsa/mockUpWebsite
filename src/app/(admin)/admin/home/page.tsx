"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConfigText from "@/components/admin/ConfigText";
import { Suspense, useEffect, useState } from "react";
import ConfigImage from "@/components/admin/ConfigImage";
import Loading from "@/components/Loading";
import { section } from "motion/react-client";

const sections = [
  {
    title: "Hero Section",
    config: [
      {
        type: "image",
        label: "Hero Banner",
        path: "/api/images?page=home&section=hero"
      },
      {
        type: "text",
        label: "Title",
        path: "/api/texts?page=home&section=hero&type=heading",
      },
    ]
  }
]

export default function ConfigHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("Session data:", session);

  // useEffect(() => {
  //   console.log("SHOW SNACKBARRRR:", isSnackbarOpen);
  // }, [isSnackbarOpen]);

  return (
    <div className="min-h-screen bg-gray-100 w-screen pb-100">
      <div className="h-screen w-full flex flex-col">
        {sections.map((section,index) => (
          <div key={index} className="mt-10 ml-80 w-fit flex flex-col gap-10 bg-red-400">
            <h1 className="text-5xl">{section.title}</h1>
            <div className="flex flex-row w-screen">
              {section.config.map((item) => (
                <div key={item.label}>
                  <ConfigText
                    label={item.label}
                    required
                    path={item.path}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* <div className="mt-10 ml-80 w-fit flex flex-col gap-10 bg-red-400"> */}
          {/* <h1 className="text-5xl">Hero Section</h1>
          <div className="flex flex-row w-screen">
            <Suspense fallback={<Loading />}>
              <ConfigImage
              label="Hero Banner"
              required
              page="home"
              section="hero"
            />
            </Suspense>
            <div className="flex flex-col ml-5">
              <ConfigText
                label="คำโปรยภาษาไทย"
                required
                page="home"
                section="hero"
                type="heading"
                lang="th"
              />
              <ConfigText
                label="คำโปรยภาษาอังกฤษ"
                required
                page="home"
                section="hero"
                type="heading"
                lang="en"
              />
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
