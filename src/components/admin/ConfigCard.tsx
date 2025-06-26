"use client";

import Image from "next/image";
import { CardConfig } from "../../../interface";
import { useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import EditCardModal from "./ModalCard";
import ConfirmModal from "./ConfirmModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ConfigCardProps extends CardConfig {
    path: string;
}

const ConfigCard = ({
  id,
  title,
  title_en,
  image_url,
  body,
  body_en,
  href,
  is_active,
  path,
}: ConfigCardProps) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModelConfirmOpen, setIsModelConfirmOpen] = useState(false);
  const [isSnackbarEditOpen, setSnackbarEditOpen] = useState(false);
  const [isSnackbarConfirmOpen, setSnackbarConfirmOpen] = useState(false);

  const openSnackbarEdit = () => {
    setSnackbarEditOpen(true);
  };

  const openSnackbarConfirm = () => {
    setSnackbarConfirmOpen(true);
  };

  const openModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };

  const openModelConfirmOpen = () => {
    setIsModelConfirmOpen(true);
  };

  const closeModelConfirmOpen = () => {
    setIsModelConfirmOpen(false);
  };

  return (
    <div className="flex flex-wrap relative">
      <div className="bg-gray-300 shadow-xl rounded-lg w-40 lg:w-52 h-70">
        <div className="relative w-full h-[40%] pl-4 mt-4 flex flex-row justify-between">
          <h2 className="text-xl w-fit font-bold text-black">{title}</h2>
          <IoPencil
            className="mr-3 text-blue-600 cursor-pointer"
            onClick={openModalEdit}
          />
          <FaRegTrashAlt
            className="text-red-600 absolute right-0 bottom-0 mr-3 mb-3 cursor-pointer"
            onClick={openModelConfirmOpen}
          />
        </div>
        <div className="w-full h-[60%] relative overflow-hidden">
          <Image
            src={image_url || ""}
            alt={title || "this is image alt"}
            // sizes="(max-width: 640px) 100vw, (min-width: 641px) 50vw"
            fill={true}
            style={{ objectFit: "cover" }}
            className="rounded-b-md"
          />
        </div>
      </div>
      <EditCardModal
        isOpen={isModalEditOpen}
        onClose={closeModalEdit}
        data={{
          id,
          image_url,
          title,
          title_en,
          href,
          body,
          body_en,
        }}
        openSnackbar={openSnackbarEdit}
        path={`/api/${path}/${id}`}
      />
      <ConfirmModal
        isOpen={isModelConfirmOpen}
        onClose={closeModelConfirmOpen}
        data={{ id }}
        path={`/api/${path}/${id}`}
        openSnackbar={openSnackbarConfirm}
      />
      <Snackbar
        open={isSnackbarEditOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarEditOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">Updated successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={isSnackbarConfirmOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarConfirmOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">Deleted successfully!</Alert>
      </Snackbar>
    </div>
  );
};

export default ConfigCard;
