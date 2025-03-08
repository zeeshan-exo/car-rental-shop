"use client";
import React from "react";
import { deleteUser } from "@/actions/users";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

interface Props{
  Id: string
}


const DeleteButton = ({ Id }: Props) => {
  const handleDelete = async () => {
    if (!Id) {
      toast.error("No user found with such id");
      return;
    }
    if (!confirm("Are you sure you want to delete this User?")) {
      return;
    }

    try {
      await deleteUser(Id);
      toast.success("User deleted successfully!");
      console.log(`User with id ${Id} deleted successfully.`);
      
      
    } catch (error) {
      console.error("Error while deleting user", error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-2xl px-2 py-1 rounded"
    >
      <MdDelete/>
    </button>
  );
};

export default DeleteButton;
