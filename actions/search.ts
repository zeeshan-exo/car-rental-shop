"use server";
import { getCollection } from "@/lib/db";

export async function searchQuery(query: string) {
  if (!query) {
    return { users: [], cars: [] };
  }

  try {
    const users = await (await getCollection("users"))
      .find({
        $or: [
          { username: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      })
      .limit(10)
      .toArray();


    const cars = await (await getCollection("cars"))
      .find({
        $or: [
          { carName: { $regex: query, $options: "i" } },
          { brand: { $regex: query, $options: "i" } },
          { city: { $regex: query, $options: "i" } },
        ],
      })
      .limit(10)
      .toArray();

    return {
      users: users.map((user) => ({
        id: user._id.toString(),
        username: user.username,
      })),
      cars: cars.map((car) => ({
        id: car._id.toString(),
        carName: car.carName,
        brand: car.brand,
        city: car.city,
      })),
    };
  } catch (error) {
    console.error("Search error:", error);
    return { users: [], cars: [], error: "Failed to perform search" };
  }
}