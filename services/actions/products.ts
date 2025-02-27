"use server";
import { getCollection } from "@/lib/db";
import { ProductSchema } from "@/lib/definations/productDefinations";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";


export async function addCar(state: any, formData: FormData) {
  console.log("FormData:", formData);
  
  const rawData: Record<string, string | File | string[]> = Object.fromEntries(formData.entries());
  
  delete rawData.image;
  console.log("RawData:", rawData)

  if (rawData.images) {
    try {
      rawData.images = JSON.parse(rawData.images as string); 
    } catch (error) {
      console.error("Error parsing images field:", error);
      rawData.images;
    }
  }

  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return { errors: { session: "User session not found" } };
  const payload = await decrypt(session);
  if (!payload) return { errors: { session: "Invalid session data" } };

  rawData.vendorId = payload?.userId;  

  const validatedFields = ProductSchema.safeParse(rawData);
  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten());
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { vendorId, ...carData } = validatedFields.data;
  console.log("ValidatedFields:", validatedFields)

  try {
    const carsCollection = await getCollection("cars"); 
    if (!carsCollection) {
      return { errors: { database: "Cars collection not found" } };
    }

    const result = await carsCollection.insertOne({
      ...carData,
      vendorId: payload?.userId, 
      vendorName: payload?.name,
      vendorEmail: payload?.email
    });

    console.log("Data:", result)

    return { success: true, message: "Car added successfully!" };
  } catch (error) {
    console.error("Error creating car:", error);
    return {
      errors: {
        database: "Failed to create car",
        details: error.message,
      },
    };
  }
}


export async function getAllCars(query = "", page = '', limit = 3) {
  try {
    const carsCollection = await getCollection("cars");
    if (!carsCollection) {
      console.error("Cars collection not found.");
      return { cars: [], totalPages: 1 };
    }

    const filter = query ? { carName: { $regex: query, $options: "i" } } : {};

    const totalCars = await carsCollection.countDocuments(filter);
    const totalPages = Math.ceil(totalCars / limit);

    const cars = await carsCollection
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return { cars, totalPages };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { cars: [], totalPages: 1 };
  }
}



export async function getCar(id:string) {
  try {
    const carsCollection = await getCollection("cars");
    if(carsCollection){
      const car = await carsCollection.findOne({ _id: new ObjectId(id) });

      if (!car) return null;
  
      return {
        ...car,
        _id: car._id.toString(),
      };
    }
  } catch (error) {
    console.error("Error while fetching cars data:", error);
    return null;
  }
}


export async function getVendorCars() {
  try {
    const session = (await cookies()).get('session')?.value
    if(!session){
      console.log("No session found in cookies")
    }
    const payload = await decrypt(session)
    if(!payload){console.log("data not found in payload")}

    const carsCollection = await getCollection("cars");
    if(carsCollection){
      const cars = await carsCollection.find({vendorId: payload?.userId}).toArray()   
      return cars.length ? cars : [];
    } 

  } catch (error) {
    console.error("Error fetching cars:", error);
  }
}

export async function deleteCar(_id: string) {
  try {
    const carsCollection= await getCollection("cars");
    console.log("ID: " , _id)
    const carId = new  ObjectId(_id)
    if(carsCollection){
      await carsCollection.deleteOne( {_id: carId});
    }

  } catch (error) {
    console.error("Error while deleting car", error);
  }
}