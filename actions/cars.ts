"use server";
import { getCollection } from "@/lib/db";
import { CarSchema } from "@/lib/definations/carDefinations";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";


export async function addCar(state: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries()) as Record<string, any>;

  delete rawData.image;
  console.log("RawData:", rawData);

  if (rawData.images) {
    try {
      rawData.images = JSON.parse(rawData.images as string); 
    } catch (error) {
      console.error("Error parsing images field:", error);
    }
  }

  if (rawData.details) {
    if (typeof rawData.details === "string" && rawData.details.trim() !== "") {
      try {
        rawData.details = JSON.parse(rawData.details as string);
      } catch (error) {
        console.error("Error parsing details field:", error);
      }
    } else {
      rawData.details = { text: "", specs: {} };
    }
  } else {
    rawData.details = { text: "", specs: {} };
  }

  if (rawData.modelYear) {
    rawData.modelYear = Number(rawData.modelYear);
  }
  if (rawData.rentalRate) {
    rawData.rentalRate = Number(rawData.rentalRate);
  }
  if (rawData.carQuantity) {
    rawData.carQuantity = Number(rawData.carQuantity);
  }
 
 const session = await getServerSession( authOptions)
  if(!session){
    console.log("No Session found")
    return []
  }

  rawData.vendor = {
    vendorId: session.user?.id,
    vendorName: session.user?.name,
    vendorEmail: session.user?.email,
  };

  const validatedFields = CarSchema.safeParse(rawData);
  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten());
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const now = new Date();
  const finalCarData = {
    ...validatedFields.data,
    createdAt: validatedFields.data.createdAt || now,
    updatedAt: now,
  };

  try {
    const carsCollection = await getCollection("cars"); 
    if (!carsCollection) {
      return { errors: { database: "Cars collection not found" } };
    }
    const result = await carsCollection.insertOne(finalCarData);
    console.log("Data:", result);
    return { success: true, message: "Car added successfully!" };
  } catch (error: any) {
    console.error("Error creating car:", error);
    return {
      errors: {
        database: "Failed to create car",
        details: error.message,
      },
    };
  }
}

export async function getAllCars(query = "", page: number | string = 1, limit = 9) {
  try {
    const numericPage = Number(page ) || 1
     const valid = Math.max(1, numericPage)
     const skip = (valid - 1) * limit

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
      .skip(skip)
      .limit(limit)
      .toArray();

    const serializedCars = cars.map(car => ({
        ...car,
        _id: car._id.toString(), 
    }));

    return { cars: serializedCars, totalPages };
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
    const session = await getServerSession(authOptions)
    if (!session) {
      console.log("No session found");
      return [];
    }

    if (session.user?.role !== "vendor") {
      console.log("User is not a vendor");
      return [];
    }

    const vendorId = session.user?.id;
    const carsCollection = await getCollection("cars");
    if (carsCollection) {
      const cars = await carsCollection.find({ "vendor.vendorId": vendorId }).toArray();
      return cars.map((car) => ({
        ...car,
        _id: car._id.toString(),
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching vendor cars:", error);
    return [];
  }
}


export async function updateCar(carId: string, formData: FormData) {
  const carcollection = await getCollection("cars");
  if (!carcollection) throw new Error("Database connection failed.");

  const newData: any = {};
  formData.forEach((value, key) => {
    newData[key] = value;
  });

  console.log("Converted newData:", newData);

  if (Object.keys(newData).length === 0) {
    throw new Error("newData is empty, update will not be performed.");
  }

  if (typeof newData.images === "string") {
    try {
      newData.images = JSON.parse(newData.images);
    } catch (error) {
      console.error("Failed to parse images JSON:", error);
      throw new Error("Invalid images format.");
    }
  }

  if (newData.details && typeof newData.details === "string") {
    try {
      newData.details = JSON.parse(newData.details);
    } catch (error) {
      console.error("Failed to parse details JSON:", error);
      throw new Error("Invalid details format.");
    }
  }

  newData.updatedAt = new Date();

  if (newData.modelYear) {
    newData.modelYear = Number(newData.modelYear);
  }
  if (newData.rentalRate) {
    newData.rentalRate = Number(newData.rentalRate);
  }
  if (newData.carQuantity) {
    newData.carQuantity = Number(newData.carQuantity);
  }

  const objectId = new ObjectId(carId);
  const existingCar = await carcollection.findOne({ _id: objectId });
  if (!existingCar) {
    throw new Error("Car not found in the database.");
  }

  console.log("Existing Car Data:", existingCar);

  const result = await carcollection.updateOne(
    { _id: objectId },
    { $set: newData }
  );

  console.log("Update Result:", result);
  return result;
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