"use server";
import { getCollection } from "@/lib/db";
import { ProductSchema } from "@/lib/productDefinations/productDefinations";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function createProduct(state, formData) {
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = ProductSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { vendorId, ...productData } = validatedFields.data;

  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
    if (!session) return { errors: { session: "User session not found" } };

  const payload = await decrypt(session);
  if (!payload) return { errors: { session: "Invalid session data" } };

  try {
    const productCollection = await getCollection("products");
    if (!productCollection) return { errors: { database: "Products collection not found" } };

    await productCollection.insertOne({
      ...productData,
      vendorId: payload?.userId,
    });

    return { success: true, message: "Product created successfully!" };
  } catch (error) {
    console.error("Error creating product:", error);
    return { errors: { database: "Failed to create product", details: error.message } };
  }
}

export async function getAllProducts() {
  try {
    const productCollection = await getCollection("products");
    if (!productCollection) {
      console.error("Products collection not found.");
    }

    const products = await productCollection.find().toArray();
    return products.length ? products : []; 
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function getVendorProducts() {
  try {

    const session = (await cookies()).get('session').value
    if(!session){
      console.log("No session found in cookies")
    }
    const payload = await decrypt(session)
    if(!payload){console.log("data not found in payload")}

    const productCollection = await getCollection("products");
    const products = await productCollection.find({vendorId: payload?.userId}).toArray()
    return products.length ? products : []; 

  } catch (error) {
    console.error("Error fetching products:", error);
  }
}








