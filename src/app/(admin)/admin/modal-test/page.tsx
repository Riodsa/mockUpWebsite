'use client'
import React from "react";
import EditCardModal from "@/components/admin/ModalCard";

const page = () => {
  return (
    <div>
      <EditCardModal
        isOpen={true}
        onClose={() => {}}
        onSave={() => {}}
        data={{
          id: "1",
          image_url: "https://example.com/image.jpg",
          title: "Sample Card Title",
          title_en: "Sample Card Title EN",
          href: "https://example.com",
          body: "This is a sample description for the card.",
          body_en: "This is a sample description for the card in English.",
        }}
      />
    </div>
  );
};

export default page;
