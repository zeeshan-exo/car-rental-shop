"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { addCar, updateCar } from "@/actions/cars";
import { AddCarType, CarType } from "@/lib/definations/carDefinations";
import Image from "next/image";
import { 
  Plus, 
  Edit, 
  X, 
  Upload, 
  Image as ImageIcon, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CarForm = ({ carData = null, isInlineEdit = false, onEditComplete = () => {} }) => {
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
      
      
      if (carData.details?.specs) {
        setShowDetailsSpecs(true);
      }
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

      if (isInlineEdit) {
        onEditComplete();
      } else {
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Operation failed. Please try again.");
      console.error(error);
    }
  };

  const renderFormContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            <Label htmlFor={label} className="text-sm font-semibold text-gray-700 mb-2">{label}</Label>
            <Input
              name={name}
              id={name}
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
          <Label htmlFor="details" className="text-sm font-semibold text-gray-700 mb-2">Details</Label>
          <Textarea
            name="detailsText"
            id="details"
            value={formState.detailsText}
            onChange={handleChange}
            placeholder="Provide a general description for the car."
            rows={5}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <Button
            variant="outline"
            type="button"
            className="mt-2 text-AppPrimary flex items-center gap-1 text-sm hover:text-AppPrimary2 transition-colors"
            onClick={() => setShowDetailsSpecs((prev) => !prev)}
          >
            {showDetailsSpecs ? (
              <>
                <ChevronUp size={16} /> Hide Additional Specs
              </>
            ) : (
              <>
                <ChevronDown size={16} /> Add Additional Specs
              </>
            )}
          </Button>
        </div>

        {showDetailsSpecs && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <Label htmlFor="fuelType" className="text-sm font-semibold text-gray-700 mb-2">Fuel Type</Label>
              <Input
                name="detailsFuelType"
                id="fuelType"
                value={formState.detailsFuelType}
                onChange={handleChange}
                placeholder="Enter fuel type"
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="transmission" className="text-sm font-semibold text-gray-700 mb-2">Transmission</Label>
              <Input
                id="trasmission"
                name="detailsTransmission"
                value={formState.detailsTransmission}
                onChange={handleChange}
                placeholder="Enter transmission type"
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="flex flex-col col-span-3">
              <Label htmlFor="features" className="text-sm font-semibold text-gray-700 mb-2">Features</Label>
              <Input
                name="detailsFeatures"
                value={formState.detailsFeatures}
                onChange={handleChange}
                id="features"
                placeholder="Enter features (comma separated)"
                className="p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="image-upload" className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Upload size={18} /> Upload Images
          </Label>
          <div className="flex items-center gap-4">
            <Input 
              type="file"
              multiple 
              onChange={handleImageChange} 
              className="hidden" 
              id="image-upload"
            />
            <Label 
              htmlFor="image-upload" 
              className="flex items-center gap-2 bg-blue-50 text-AppPrimary px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <ImageIcon size={18} /> Choose Files
            </Label>
          </div>
        </div>

        {selectedImages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {selectedImages.map((src, index) => (
              <div key={index} className="relative group">
                <Image
                  src={src} 
                  alt="Preview" 
                  width={56}
                  height={56}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 group-hover:scale-105 transition-transform" 
                />
                <Button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-AppDanger text-AppLight rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        {isInlineEdit && (
          <Button
            type="button" 
            variant="outline"
            onClick={onEditComplete}
            className="w-full py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <X size={18} /> Cancel
          </Button>
        )}
        <Button
          type="submit" 
          className="w-full bg-AppPrimary text-AppLight hover:text-AppLight py-3 rounded-lg font-bold hover:bg-AppPrimaryHover transition-colors flex items-center justify-center gap-2"
        >
          {carData ? <> Save Changes</> : <><Plus size={18} /> Add Car</>}
        </Button>
      </div>
    </form>
  );

  if (isInlineEdit) {
    return <div className="p-6">{renderFormContent()}</div>;
  }

  return (
    <div>
      <button
        className="bg-AppPrimary text-AppLight rounded-lg px-4 py-2 mb-4 flex items-center gap-2 hover:bg-AppPrimary2 transition-colors shadow-md"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus size={18} /> Add Car
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
          <div className="bg-AppLight rounded-2xl shadow-2xl w-full max-w-4xl relative flex flex-col max-h-[95vh]">
            <div className="bg-AppPrimary p-6 flex justify-between items-center flex-shrink-0 rounded-t-xl">
              <h2 className="text-2xl font-bold text-AppLight">Add New Car</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-AppLight hover:bg-blue-700/30 rounded-full p-2 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 pr-4 p-8">
              {renderFormContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarForm;