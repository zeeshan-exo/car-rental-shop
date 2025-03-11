"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { addCar, updateCar } from "@/actions/cars";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Edit, 
  X, 
  Upload, 
  Image as ImageIcon, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

const ProductForm = ({ carData = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [formState, setFormState] = useState({
    carName: "",
    brand: "",
    modelYear: "",
    rentalRate: "",
    carQuantity: "",
    city: "",
    detailsText: "",
    detailsFuelType: "",
    detailsTransmission: "",
    detailsFeatures: "",
  });
  const [showDetailsSpecs, setShowDetailsSpecs] = useState(false);

  useEffect(() => {
    if (carData) {
      setFormState({
        carName: carData.carName || "",
        brand: carData.brand || "",
        modelYear: carData.modelYear || "",
        rentalRate: carData.rentalRate || "",
        carQuantity: carData.carQuantity || "",
        city: carData.city || "",
        detailsText: carData.details?.text || "",
        detailsFuelType: carData.details?.specs?.fuelType || "",
        detailsTransmission: carData.details?.specs?.transmission || "",
        detailsFeatures: carData.details?.specs?.features
          ? carData.details.specs.features.join(", ")
          : "",
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

    const details = {
      text: formState.detailsText,
      specs: {
        fuelType: formState.detailsFuelType || undefined,
        transmission: formState.detailsTransmission || undefined,
        features: formState.detailsFeatures
          ? formState.detailsFeatures.split(",").map((f) => f.trim())
          : undefined,
      },
    };

    const formData = new FormData();
    formData.append("carName", formState.carName);
    formData.append("brand", formState.brand);
    formData.append("modelYear", formState.modelYear);
    formData.append("rentalRate", formState.rentalRate);
    formData.append("carQuantity", formState.carQuantity);
    formData.append("city", formState.city);
    formData.append("details", JSON.stringify(details));

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
      <button
        className="bg-blue-600 text-white rounded-lg px-4 py-2 mb-4 flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md"
        onClick={() => setIsModalOpen(true)}
      >
        {carData ? <><Edit size={18} /> Edit Car</> : <><Plus size={18} /> Add Car</>}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative flex flex-col max-h-[95vh]">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex justify-between items-center flex-shrink-0">
              <h2 className="text-2xl font-bold text-white">
                {carData ? "Edit Car Details" : "Add New Car"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:bg-blue-700/30 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 pr-4">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "carName", label: "Car Name", placeholder: "Enter car name" },
                    { name: "brand", label: "Brand", placeholder: "Enter brand" },
                    { name: "modelYear", label: "Model Year", placeholder: "Enter model year" },
                    { name: "rentalRate", label: "Rental Rate", placeholder: "Enter rental rate" },
                    { name: "carQuantity", label: "Car Quantity", placeholder: "Enter quantity" },
                    { name: "city", label: "City", placeholder: "Enter city" }
                  ].map(({ name, label, placeholder }) => (
                    <div key={name} className="flex flex-col">
                      <label className="text-sm font-semibold text-gray-700 mb-2">{label}</label>
                      <input
                        name={name}
                        value={formState[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2">Details</label>
                    <textarea
                      name="detailsText"
                      value={formState.detailsText}
                      onChange={handleChange}
                      placeholder="Provide a general description for the car."
                      rows={3}
                      className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      className="mt-2 text-blue-600 flex items-center gap-1 text-sm hover:text-blue-800 transition-colors"
                      onClick={() => setShowDetailsSpecs((prev) => !prev)}
                    >
                      {showDetailsSpecs ? (
                        <>
                          <ChevronUp size={16} /> Hide Additional Specs
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} /> Show Additional Specs
                        </>
                      )}
                    </button>
                  </div>

                  {showDetailsSpecs && (
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
                        <input
                          name="detailsFuelType"
                          value={formState.detailsFuelType}
                          onChange={handleChange}
                          placeholder="Enter fuel type"
                          className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Transmission</label>
                        <input
                          name="detailsTransmission"
                          value={formState.detailsTransmission}
                          onChange={handleChange}
                          placeholder="Enter transmission type"
                          className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="flex flex-col col-span-3">
                        <label className="text-sm font-semibold text-gray-700 mb-2">Features</label>
                        <input
                          name="detailsFeatures"
                          value={formState.detailsFeatures}
                          onChange={handleChange}
                          placeholder="Enter features (comma separated)"
                          className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Upload size={18} /> Upload Images
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleImageChange} 
                        className="hidden" 
                        id="image-upload"
                      />
                      <label 
                        htmlFor="image-upload" 
                        className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                      >
                        <ImageIcon size={18} /> Choose Files
                      </label>
                    </div>
                  </div>

                  {selectedImages.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {selectedImages.map((src, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={src} 
                            alt="Preview" 
                            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:scale-105 transition-transform" 
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {carData ? <><Edit size={18} /> Save Changes</> : <><Plus size={18} /> Add Car</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;