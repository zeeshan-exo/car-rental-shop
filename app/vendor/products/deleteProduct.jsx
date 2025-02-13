"use client";
import React, { useState } from "react";
import { deleteProduct } from "@/app/actions/products";
import { toast } from "react-toastify";
import {  Trash2 } from "lucide-react";


const DeleteProductButton = ({ productId }) => {
  const handleDelete = async () => {
    if (!productId) {
      toast.error("No product found with such id");
      return;
    }
    
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully!");
      console.log(`Product with id ${productId} deleted successfully.`);
      
    } catch (error) {
      console.error("Error while deleting product", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-2xl px-2 py-1 rounded"
    >
      <Trash2/>
    </button>
  );
};

export default DeleteProductButton;
