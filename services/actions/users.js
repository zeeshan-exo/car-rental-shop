"use server"
import { getCollection } from "@/lib/db";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import {ObjectId} from "mongodb"

export async function getUsers() {
    try {
        const userCollection = await getCollection('users')
        if(!userCollection){
            console.error("Users collection not found.");
        }
        const users = await userCollection.find().toArray()
        return users.length ? users : []; 
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export async function getUser(){
    
    try {
        const session = (await cookies()).get('session').value
        const payload = await decrypt(session)
        const userCollection = await getCollection("users")
        await userCollection.findOne({_id: new ObjectId(payload.userId)})
        if(_id){
            console.log("No user found with such id")
        }
    } catch (error) {
        console.error("Error while getting user with this id")
    }
}

export async function deleteUser(_id){
    try {
        const session = (await cookies()).get('session').value
        const payload = await decrypt(session)
        const userCollection = await getCollection('users')
        await userCollection.deleteOne({_id: new ObjectId(payload.userId)})

        if(!_id){
            console.log("No user found with such id")
        }
    } catch (error) {
        console.log("Error while deleting User",error)
    }
}