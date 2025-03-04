"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addCar, updateCar } from "@/services/actions/cars";
import { Button } from "@/components/ui/button";
import Viewcar from "./viewCar";

const ProductForm = ({ carData = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [formState, setFormState] = useState({
    carName: "",
    brand: "",
    model: "",
    price: "",
    carQuantity: "",
    city: "",
    description: "",
  });

  useEffect(() => {
    if (carData) {
      setFormState({
        carName: carData.carName || "",
        brand: carData.brand || "",
        model: carData.model || "",
        price: carData.price || "",
        carQuantity: carData.carQuantity || "",
        city: carData.city || "",
        description: carData.description || "",
      });

      setSelectedImages(carData.images || []);
    }
  }, [carData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(previews);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setSelectedImages((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[index]);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFiles.length > 0) {
      const imageData = new FormData();
      imageFiles.forEach((file) => imageData.append("image", file));

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageData,
      });

      const uploadResult = await uploadResponse.json();
      if (!uploadResult.success) {
        toast.error("Image upload failed");
        return;
      }

      formData.append("images", JSON.stringify(uploadResult.uploads));
    } else {
      formData.append("images", JSON.stringify(selectedImages));
    }

    try {
      if (carData) {
        await updateCar(carData._id, formData);
        toast.success("Car updated successfully!");
      } else {
        await addCar(null, formData);
        toast.success("Car added successfully!");
      }

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Operation failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        className="bg-sky-500 text-white rounded-md p-2 mb-2"
        onClick={() => setIsModalOpen(true)}
      >
        {carData ? "Edit Car ": "Add Car"}
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600 text-2xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Car Name</label>
                <input
                  name="carName"
                  value={formState.carName}
                  onChange={handleChange}
                  placeholder="Enter car name"
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Brand</label>
                <input
                  name="brand"
                  value={formState.brand}
                  onChange={handleChange}
                  placeholder="Enter brand"
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Model</label>
                <input
                  name="model"
                  value={formState.model}
                  onChange={handleChange}
                  placeholder="Enter model"
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Rental Price</label>
                <input
                  name="price"
                  value={formState.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Car Quantity</label>
                <input
                  name="carQuantity"
                  value={formState.carQuantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">City</label>
                <input
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col col-span-3">
                <label className="font-semibold mb-1">Details</label>
                <textarea
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  placeholder="Provide details for the cars."
                  rows={3}
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col col-span-3">
                <label className="font-semibold mb-1">Upload Images</label>
                <input type="file" multiple onChange={handleImageChange} />
                {selectedImages.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedImages.map((src, index) => (
                      <div key={index} className="relative">
                        <img src={src} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-0 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="col-span-3 bg-sky-500 text-white p-2 rounded font-bold">
                {carData ? "Save" : "Add Car"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
