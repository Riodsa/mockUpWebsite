"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Card } from "../../../interface";

type EditCardModalProps = {
  isOpen: boolean;
  onClose: Function;
  data: Card;
  path: string;
  openSnackbar: Function;
};

const EditCardModal = ({ isOpen, onClose, data, path, openSnackbar }: EditCardModalProps) => {
  const [formData, setFormData] = useState<any>({
    id: data.id,
    image_url: data.image_url,
    title: data.title,
    title_en: data.title_en,
    href: data.href,
    body: data.body,
    body_en: data.body_en,
  });

  useEffect(() => {
    setFormData({
      image_url: data.image_url,
      title: data.title,
      title_en: data.title_en,
      href: data.href,
      body: data.body,
      body_en: data.body_en,
    });
  }, [data]);

  const handleInputChange = (field: any, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(path);
      const response = await fetch(path, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to update");
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-gray-200">
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Card - {data.id}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-1">
            {formData.image_url && (
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-1">
                  Image
                </label>
                <input
                  type="url"
                  placeholder="Image Url"
                  value={formData.image_url}
                  onChange={(e) =>
                    handleInputChange("image_url", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {formData.title && (
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                  />
                </div>
              )}
              {formData.title_en && (
                <div>
                  <label className="block text-lg font-medium text-gray-900 mb-1">
                    Title ( EN )
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title_en}
                    onChange={(e) =>
                      handleInputChange("title_en", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                  />
                </div>
              )}
            </div>

            {formData.href && (
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-1">
                  Hyperlink
                </label>
                <input
                  type="url"
                  placeholder="Hyperlink"
                  value={formData.href}
                  onChange={(e) => handleInputChange("href", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 placeholder-gray-400"
                />
              </div>
            )}

            {formData.body && (
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  value={formData.body}
                  onChange={(e) => handleInputChange("body", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-500 placeholder-gray-400"
                />
              </div>
            )}

            {formData.body_en && (
              <div>
                <label className="block text-lg font-medium text-gray-900 mb-1">
                  Description ( EN )
                </label>
                <textarea
                  placeholder="Description"
                  value={formData.body_en}
                  onChange={(e) => handleInputChange("body_en", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-500 placeholder-gray-400"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;
