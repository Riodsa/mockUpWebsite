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
import SwitchTabButton from "../SwitchTabButton";

interface ConfigCardProps {
    cardData: CardConfig[];
    path: string;
}

const Cards = ({ cardData, path }: { cardData: CardConfig; path: string }) => {
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
    (<div className="flex flex-wrap relative" key={`card-${cardData.id}`}>
        <div className="bg-[rgb(253,253,253)]  shadow-[0_2px_10px_rgba(0,0,0,0.1)] rounded-lg w-55 lg:w-70 h-85 overflow-hidden">
          <div className="relative w-full h-[40%] pl-4 mt-4 flex flex-row justify-between">
            <h2 className="text-xl w-fit font-bold text-black">{cardData.title}</h2>
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
                src={cardData.image_url || ""}
                alt={cardData.title || "this is image alt"}
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
            data={cardData}
            openSnackbar={openSnackbarEdit}
            path={`/api/${path}/${cardData.id}`}
          />
          <ConfirmModal
            isOpen={isModelConfirmOpen}
            onClose={closeModelConfirmOpen}
            data={{ id: cardData.id }}
            path={`/api/${path}/${cardData.id}`}
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
      )
    );
}

const ConfigCard = ({
  cardData,
  path,
}: ConfigCardProps) => {
  

  const [isActiveTab, setIsActiveTab] = useState<boolean>(true);
  const [data, setData] = useState<CardConfig[]>(cardData.filter((item) => item.is_active === true));

  useEffect(() => {
    setData(cardData.filter((item) => item.is_active === isActiveTab));
  }, [isActiveTab]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row self-start gap-10">
          <SwitchTabButton
            key={'Active'}
            isActive={isActiveTab}
            onClick={() => setIsActiveTab(true)}
            label={'Active'}
          />
          <SwitchTabButton
            key={'Inactive'}
            isActive={!isActiveTab}
            onClick={() => setIsActiveTab(false)}
            label={'Inactive'}
          />
      </div>
      <div className="flex flex-wrap gap-15 relative h-auto">
        { data.length > 0 ? data.map((data) => (
          <Cards key={`card-${data.id}`} cardData={data} path={path} />
        )) : <div>{`No ${isActiveTab ? 'Active' : 'Inactive'} Cards`}</div>}
      </div>
    </div>
  );
};

export default ConfigCard;
