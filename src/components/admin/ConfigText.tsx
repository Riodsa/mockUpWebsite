"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { IoPencil } from "react-icons/io5";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSession } from "next-auth/react";
import { TextConfig } from "../../../interface";

interface ConfigTextProps extends TextConfig {
  label?: string;
  path: string;
  className?: string;
};

const ConfigText = ({
  id,
  text,
  text_en,
  label,
  path,
  page,
  section,
  type,
  className,
}: ConfigTextProps) => {
  const [isDisable, setIsDisable] = useState(true);
  const [isDisableEn, setIsDisableEn] = useState(true);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [textTh, setTextTh] = useState(text);
  const [textEn, setTextEn] = useState(text_en);

  const { data: session } = useSession();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextTh(event.target.value);
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

  const handleSave = async (lang: "th" | "en") => {
    try {
      const response = await fetch(
        `/api/${path}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify({
            ...(lang === "th"
              ? { text: textTh }
              : lang === "en"
                ? { text_en: textEn }
                : {}),
          }),
        }
      );

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
            required={true}
            disabled={isDisable}
            value={textTh}
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
      <div className="flex flex-row mb-2 justify-start items-center gap-3 text-lg ">
        <label>{label + " (EN)" || "This is label"}</label>
        <IoPencil onClick={handleEditEn} className="cursor-pointer" />
      </div>
      <div className="flex flex-row justify-start items-center gap-5">
        <TextField
          variant="outlined"
          required={true}
          disabled={isDisableEn}
          value={textEn}
          onChange={handleTextEnChange}
          className="mr-5 w-80"
        />
        {!isDisableEn ? (
          <button
            onClick={() => { handleSave("en") }}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Save
          </button>
        ) : null}
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
