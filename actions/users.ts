"use server"
import { getCollection } from "@/lib/db";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import {ObjectId} from "mongodb"

export async function getUsers(role?: "customer" | "vendor") {
    try {
        const userCollection = await getCollection('users')
        if(userCollection){

            const query  = role ? {role} : {}
            const users = await userCollection.find(query).toArray()
            return users?.length ? users.map((user) =>({
                ...user,
                _id: user._id.toString()
            })):[]

        }else{
            throw new Error ("Can't find Users Collection")
        }
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export async function getUser(_id: string){
    try {
        const userCollection = await getCollection("users")
        if (!userCollection) throw new Error("Users collection not found")
        const user = await userCollection.findOne({_id: new ObjectId(_id)})
        if(!user)throw new Error("No user found with such Id")

        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        console.error("Error while getting user:", error.message)
    }
}

export async function updateUser(_id: string, updateData: Record<string, any>) {
    try {
      if (!_id) {
        throw new Error("User ID is required for updating.");
      }
  
      const userCollection = await getCollection("users");
  
      if (!userCollection) {
        throw new Error("Error occurred while fetching Users Collection.");
      }
  
      const result = await userCollection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updateData }
      );
  
      if (result.matchedCount === 0) {
        console.log("No user found with the provided ID.");
        return { success: false, message: "No user found with the given ID." };
      }
  
      console.log(`User with ID ${_id} updated successfully.`);
      return { success: true, message: "User updated successfully." };
  
    } catch (error) {
      console.error("Error occurred while updating user details:", error);
      return { success: false, message: "Server error during user update." };
    }
  }
  

export async function deleteUser(_id: string){
    try {
        const userCollection = await getCollection('users')
        if(userCollection){  
            await userCollection.deleteOne({_id: new ObjectId(_id)})
            }else{
                throw new Error ("Error occur while finding Users Collection")
            }
        if(!_id){
            console.log("No user found with such id")
        }
    } catch (error) {
        console.log("Error while deleting User",error)
    }
}