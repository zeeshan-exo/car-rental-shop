'use server'
import { getCollection } from "@/lib/db";
import { ProductSchema } from "@/lib/productDefinations/productDefinations";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";


export async function createProduct(state, formData) {
  console.log("Form Data:", formData)
    
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = ProductSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const {vendorId, ...Data} = validatedFields.data;

  const session = (await cookies()).get('session').value
  if(!session){
    console.log("No session found in cookies")
  }
  const payload = await decrypt(session)
  if(!payload){console.log("data not found in payload")}

  console.log("Payload User ID", payload?.userId)

     validatedFields.data.vendorId = payload?.userId


  const productData ={
    ...Data,
    vendorId : payload?.userId
  }

  console.log("Product Data", productData)
  

  const productCollection = await getCollection("products");
  if (!productCollection) return { errors: { email: "products collection not found" } };

  try {
    const result = await productCollection.insertOne(productData);
    console.log("Result:" ,result)
    return { success: true, message: "Product created successfully!" };
  } catch (error) {
    return { errors: { database: "Failed to insert product", details: error.message } };
  }
}
;



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
    console.log("Vendor Crated Products", products)
    return products.length ? products : []; 

  } catch (error) {
    console.error("Error fetching products:", error);
  }
}








