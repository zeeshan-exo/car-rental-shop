// import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = process.env.MONGODB_URI;
// if (!uri) throw new Error("No MongoDB connection string found");

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// export const clientPromise = client.connect().then(() => client);

// export async function getDB(dbName: string) {
//   try {
//     await clientPromise;
//     console.log("MongoDB connected");
//     return client.db(dbName);
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function getCollection(collectionName: string) {
//   const db = await getDB("rental-shop-project");
//   if (db) return db.collection(collectionName);
//   return null;
// }



import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getCollection(collectionName) {
  const client = await clientPromise;
  const db = client.db("rental-shop-project");
  return db.collection(collectionName);
}

export default clientPromise;
