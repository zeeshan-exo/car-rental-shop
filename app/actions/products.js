'use server'
import { getCollection } from "@/lib/db";
import { ProductSchema } from "@/lib/productDefinations/productDefinations";


export async function createProduct(state, formData) {
    
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = ProductSchema.safeParse(rawData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const productInfo = validatedFields.data;

  const productCollection = await getCollection("products");
  if (!productCollection) return { errors: { email: "products collection not found" } };

  try {
    await productCollection.insertOne(productInfo);
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
