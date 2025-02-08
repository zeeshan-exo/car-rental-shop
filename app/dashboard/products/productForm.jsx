"use client";
import React, { useActionState, useState } from "react";
import { createProduct } from "@/app/actions/products";
import { startTransition } from "react";

const ProductForm = () => {
  const [state, action, pending] = useActionState(createProduct, undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState("");

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (formData) => {
    if (imageFile) {
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: imageData,
      });

      const uploadResult = await uploadResponse.json();
      if (!uploadResult.success) {
        console.error("Image upload failed:", uploadResult.error);
        return;
      }

      formData.append("image", uploadResult.cloudinaryUrl);
    }

    startTransition(() => {
      action(formData);
    });
    setIsModalOpen(false); 
  };

  return (
    <div>
      <button
        className="bg-indigo-800 text-white rounded-md p-3 mb-2"
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

              <div className="flex flex-col col-span-3">
                <label htmlFor="image" className="font-semibold mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  class="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 "
                />
              </div>
               
              <div className="flex flex-col col-span-3">
                <label htmlFor="description" className="font-semibold mb-1">
                  Product Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  placeholder="fill out the details of your product"
                  rows={3}
                  className="p-2 rounded-md border bg-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 placeholder:text-sm"
                />
                {state?.errors?.description && (
                  <p className="text-red-600 text-sm">{state.errors.description}</p>
                )}
              </div>


              <div className="col-span-3 mt-4 flex justify-between">
                <p className="text-blue-600">Tips: <span className="text-sm text-gray-400">Choose a more detailed name of your product, but keep it short.</span></p>
                <button
                  disabled={pending}
                  type="submit"
                  className="bg-indigo-800 text-white p-2 font-bold rounded-md disabled:bg-slate-500"
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
