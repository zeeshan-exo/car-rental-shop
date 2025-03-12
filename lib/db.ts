import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_CONN;
if (!uri) throw new Error("No MongoDB connection string found");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const clientPromise = client.connect().then(() => client);

export async function getDB(dbName: string) {
  try {
    await clientPromise;
    console.log("MongoDB connected");
    return client.db(dbName);
  } catch (error) {
    console.error(error);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB("rental-shop-project");
  if (db) return db.collection(collectionName);
  return null;
}
