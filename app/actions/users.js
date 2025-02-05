import { getCollection } from "@/lib/db";



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

export async function deleteUser(id){
    try {
        const userCollection = await getCollection('users')
        await userCollection.deleteOne({_id: id})

        if(!id){
            console.log("No user found with such id")
        }

    } catch (error) {
        console.log("Error while deleting User",error)
    }
}