"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IoPencil } from "react-icons/io5";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSession } from "next-auth/react";

type ConfigTextProps = {
  label: string;
  required?: boolean;
  path: string;
  className?: string;
};

const ConfigText = ({ label, required, path, className }: ConfigTextProps) => {
  const [isDisable, setIsDisable] = useState(true);
  const [isDisableEn, setIsDisableEn] = useState(true);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [text, setText] = useState("");
  const [textEn, setTextEn] = useState("");

  const { data: session } = useSession();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleTextEnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextEn(event.target.value);
  };

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };

  const handleEdit = () => {
    setIsDisable(!isDisable);
  };

  const handleEditEn = () => {
    setIsDisableEn(!isDisableEn);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${path}`);
      const data = await response.json();
      setText(data[0].text);
      setTextEn(data[0].text_en);
    };

    fetchData();
  }, []);

  const handleSave = async (lang: "th" | "en") => {
    try {
      const response = await fetch(`${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          ...(lang === "th"
            ? { text: text }
            : lang === "en"
              ? { text_en: textEn }
              : {}),
        }),
      });

      if (response.ok) {
        if (lang === "th") {
          setIsDisable(true);
        } else {
          setIsDisableEn(true);
        }
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
    <div className={`w-100 mb-5 flex flex-col gap-3 ${className}`}>
      <div>
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
              onClick={() => {
                handleSave("th");
              }}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Save
            </button>
          ) : null}
        </div>{" "}
      </div>
      <div>
        <div className="flex flex-row mb-2 justify-start items-center gap-3 text-lg ">
          <label>{label + " (EN)" || "This is label"}</label>
          <IoPencil onClick={handleEditEn} className="cursor-pointer" />
        </div>
        <div className="flex flex-row justify-start items-center gap-5">
          <TextField
            variant="outlined"
            required={required || false}
            disabled={isDisableEn}
            value={textEn}
            onChange={handleTextEnChange}
            className="mr-5 w-80"
          />
          {!isDisableEn ? (
            <button
              onClick={() => {
                handleSave("en");
              }}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Save
            </button>
          ) : null}
        </div>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">Text changed successfully!</Alert>
      </Snackbar>
    </div>
  );
};

export default ConfigText;
