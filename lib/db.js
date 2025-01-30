import "server-only"
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.DB_CONN

if(!uri) throw new Error ("No Mongodb connection string found")

    //  mongoose.connect(uri).then(()=>console.log("Mongo DB Connected")).catch((error)=>console.log(error))

const client= new MongoClient(uri,{
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
        deprecationErrors: true
    }
})


export async function getDB(dbName) {
    try {
        await client.connect()
        console.log("Mongodb connnected")
        return client.db(dbName)
    } catch (error) {
        console.log(error)
    }
}

export async function getCollection(collectionName) {
    const db= await getDB('rental-shop-project')
    if(db) return db.collection(collectionName)

        return null
}



