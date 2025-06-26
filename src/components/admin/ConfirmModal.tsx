"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CardConfig } from "../../../interface";
import { IoIosWarning } from "react-icons/io";

type EditCardModalProps = {
  isOpen: boolean;
  onClose: Function;
  data: CardConfig;
  path: string;
  openSnackbar: Function;
};

const ConfirmModal = ({ isOpen, onClose, data, path, openSnackbar }: EditCardModalProps) => {

  const handleSubmit = async () => {
    try {
      const response = await fetch(path, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete");
      handleClose();
      openSnackbar();
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200 flex flex-col justify-center items-center">
        <div className="flex flex-col text-3xl justify-center items-center py-5 gap-5">
          <IoIosWarning className="text-red-600" size={70} />
          <h1>Are you sure?</h1>
          <p className="text-lg text-center ">
            This action cannot be undone.
            <div></div>
            Please confirm if you want to proceed.
          </p>
        </div>
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 cursor-pointer"
        >
          <X size={30} />
        </button>

        <div className="flex flex-row justify-around w-[90%] pb-5 text-2xl">
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white rounded-2xl px-13 py-5 cursor-pointer hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-300 text-black rounded-2xl px-15 py-5 cursor-pointer hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
