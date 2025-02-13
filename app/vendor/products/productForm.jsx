"use client";
import React, { useActionState, useState, useEffect } from "react";
import { createProduct } from "@/app/actions/products";
import { startTransition } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [state, action, pending] = useActionState(createProduct, undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(previews);
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((rem, i) => i !== index));
    setSelectedImages((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[index]);
      return prevPreviews.filter((rem,i) => i !== index);
    });
  };

  const handleSubmit = async (formData) => {
    if (imageFiles.length > 0) {
      const imageData = new FormData();
      imageFiles.forEach((file) => {
        imageData.append("image", file);
      });

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageData,
      });

      const uploadResult = await uploadResponse.json();
      if (!uploadResult.success) {
        console.error("Image upload failed:", uploadResult.error);
        return;
      }

      formData.append("images", JSON.stringify(uploadResult.uploads));
    }

    startTransition(() => {
      action(formData);
    });
    
    setIsModalOpen(false);
    toast.success("Product Created Successfully")
  };

  return (
    <div>
      <button
        className="bg-sky-500 text-white rounded-md p-2 mb-2 "
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full m-40 relative">
            <button
              className="absolute top-3 right-3 mb-3 text-gray-600 text-2xl font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <form action={handleSubmit} className="grid grid-cols-3 gap-4">

              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold mb-1">
                  Product Title
                </label>
                <input
                  id="name"
                  name="carName"
                  type="text"
                  placeholder="car's name"
                  className="p-2 rounded-md border border-gray-200 bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
                {state?.errors?.name && (
                  <p className="text-red-600 text-sm">{state.errors.name}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="brand" className="font-semibold mb-1">
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="car's brand"
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
                {state?.errors?.brand && (
                  <p className="text-red-600 text-sm">{state.errors.brand}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="model" className="font-semibold mb-1">
                  Model
                </label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  placeholder="model"
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
                {state?.errors?.model && (
                  <p className="text-red-600 text-sm">{state.errors.model}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="price" className="font-semibold mb-1">
                  Rental Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  placeholder="price"
                  className="p-2 rounded-md border bg-slate-200 focus:outline-none shadow-md focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
                {state?.errors?.price && (
                  <p className="text-red-600 text-sm">{state.errors.price}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="carQuantity" className="font-semibold mb-1">
                  Car's Quantity
                </label>
                <input
                  id="carQuantity"
                  name="carQuantity"
                  type="text"
                  placeholder="Available Car's Quantity"
                  className="p-2 rounded-md border bg-slate-200 focus:outline-none shadow-md focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
                {state?.errors?.carQuantity && (
                  <p className="text-red-600 text-sm">{state.errors.carQuantity}</p>
                )}
              </div>

              <div className="flex flex-col col-span-3">
                <label htmlFor="image" className="font-semibold mb-1">
                  Upload Images
                </label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
                />
                {selectedImages.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedImages.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt={`Preview ${index}`}
                          className="w-24 h-24 object-cover rounded-md border "
                        />
                        <button
                          type="button"
                          onClick={()=>handleRemoveImage(index)}
                          className="absolute top-0 right-0  text-black bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col col-span-3">
                <label htmlFor="description" className="font-semibold mb-1">
                  Product Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Fill out the details of your product"
                  rows={3}
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
                {state?.errors?.description && (
                  <p className="text-red-600 text-sm">{state.errors.description}</p>
                )}
              </div>

              <div className="col-span-3 mt-4 flex justify-between">
                <p className="text-blue-600">
                  Tips:{" "}
                  <span className="text-sm text-gray-400">
                    Choose a detailed yet concise name for your product.
                  </span>
                </p>
                <button
                  disabled={pending}
                  type="submit"
                  className="bg-sky-500 text-white p-2 font-bold rounded-md disabled:bg-slate-500"
                >
                  {pending ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;