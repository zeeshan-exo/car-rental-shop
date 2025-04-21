"use server"
import { getCollection } from "@/lib/db";
import { BioFormSchema } from "@/lib/definations/authDefinations";
import {ObjectId} from "mongodb"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { error } from "console";

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

export type BioFormState = {
    errors?: {
      age?: string[];
      country?: string[];
      bio?: string[];
      form?: string[];
    };
    success?: boolean;
  };


export async function updateBio(state : BioFormState,  formData: FormData): Promise<BioFormState> {
    const rawData = Object.fromEntries(formData.entries());
  
    const validatedFields = BioFormSchema.safeParse(rawData);
    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }
  
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { errors: { form: ["You must be logged in to update profile."] } };
    }
  
    const { age, country, bio } = validatedFields.data;
    const userCollection = await getCollection("users");
  
    const result = await userCollection.updateOne(
      { email: session.user.email },
      {
        $set: {
          age,
          country,
          bio,
        },
      }
    );
  
    if (result.modifiedCount === 0) {
      return { errors: { form: ["No changes made."] } };
    }
  
    return { success: true };
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
  

export default async function deleteUser()  {
    
 try {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id

    if(!userId){
        throw new Error ("No authenticated user exist with such id")
    }

    const userCollection = await getCollection("users")
    if(!userCollection) {
        throw new Error("Failed to access the user collection.")
    }

    const result = await userCollection.deleteOne({_id: new ObjectId(userId)})

    if(result.deletedOne === 0){
        throw new Error("No such user exist i the database.")
    }

    return {success :true, message: "User account deleted successfully" }
 } catch (error) {
    console.error("Error while deleting user:", error);
        throw error;
 }
}