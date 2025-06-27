"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IoPencil } from "react-icons/io5";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ImageConfig } from "../../../interface";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ConfigImageProps extends ImageConfig {
  label?: string;
  path: string;
  className?: string;
};

const ConfigImage = ({
  id,
  image_url,
  label,
  path,
  page,
  section,
  className,
}: ConfigImageProps) => {
  const [isDisable, setIsDisable] = useState(true);
  const [imageUrl, setImageUrl] = useState(image_url);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const openSnackbar = () => {
    setSnackbarOpen(true);
  };

  const { data: session } = useSession();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleEdit = () => {
    setIsDisable(!isDisable);
  };

  const handleSave = async () => {
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
            image_url: imageUrl,
          }),
        }
      );

      if (response.ok) {
        setIsDisable(true);
        console.log("Image changed successfully!");
        openSnackbar();
      } else {
        console.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className={`w-100 mb-5 flex flex-col justify-center ${className}`}>
      <div className="flex flex-row mb-2 justify-start items-center gap-3 text-lg ">
        <label>{label || "This is label"}</label>
        <IoPencil onClick={handleEdit} className="cursor-pointer" />
      </div>
      <div className="flex flex-row justify-start items-center gap-5">
        <TextField
          variant="outlined"
          required={true}
          disabled={isDisable}
          value={imageUrl}
          onChange={handleImageChange}
          className="mr-5 w-80"
        />
        {!isDisable ? (
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer m-0 box-border overflow-hidden"
          >
            Save
          </button>
        ) : null}
      </div>
      <Image
        src={imageUrl || "/homeHeroBg.png"}
        alt={label ? label : "Image"}
        width={300}
        height={200}
        className="mt-4 rounded-md ml-3"
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">Image changed successfully!</Alert>
      </Snackbar>
    </div>
  );
};

export default ConfigImage;
