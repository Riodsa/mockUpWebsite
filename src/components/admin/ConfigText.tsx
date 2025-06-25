"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IoPencil } from "react-icons/io5";
import { useSession } from "next-auth/react";

type ConfigTextProps = {
  label: string;
  required?: boolean;
  page: string;
  section: string;
  type: string;
  lang: string;
  openSnackbar: Function
  className?: string;
};

const ConfigText = ({
  label,
  required,
  page,
  section,
  type,
  lang,
  openSnackbar,
  className,
}: ConfigTextProps) => {
  const [isDisable, setIsDisable] = useState(true);
  const [text, setText] = useState("");

  const { data: session } = useSession();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleEdit = () => {
    setIsDisable(!isDisable);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/texts?page=${page}&section=${section}&type=${type}`
      );
      const data = await response.json();
      if (lang === "en") {
        setText(data[0].text_en);
        console.log("Fetched text:", data[0].text_en);
      } else if (lang === "th") {
        setText(data[0].text);
        console.log("Fetched text:", data[0].text);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `/api/texts?page=${page}&section=${section}&type=${type}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify({
            ...(lang === "th" ? { text: text } : lang === "en" ? { text_en: text } : {}),
          }),
        }
      );

      if (response.ok) {
        setIsDisable(true);
        console.log("Text changed successfully!");
        openSnackbar();
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className={` w-120 ${className}`}>
      <div className="flex flex-row mb-2 justify-start items-center gap-3 text-lg ">
        <label>{label || "This is label"}</label>
        <IoPencil onClick={handleEdit} className="cursor-pointer" />
      </div>
      <div className="flex flex-row justify-start items-center gap-5">
        <TextField
          variant="outlined"
          required={required || false}
          disabled={isDisable}
          value={text}
          onChange={handleTextChange}
          className="mr-5 w-80"
        />
        {!isDisable ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Save
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ConfigText;
