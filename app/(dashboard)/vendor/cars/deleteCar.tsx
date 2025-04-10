"use client";
import React, { useState } from "react";
import { deleteCar } from "@/actions/cars";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

const DeletecarButton = ({ carId}: {carId: string}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (!carId) {
      toast.error("No car found with such id");
      return;
    }

    try {
      await deleteCar(carId);
      toast.success("car deleted successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error while deleting car", error);
      toast.error("Failed to delete car.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-red-500 transition text-2xl px-2 py-1 rounded"
      >
        <Trash2 />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-AppLight rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="mt-2 text-AppDark">Are you sure you want to delete this car?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-AppLight rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletecarButton;
