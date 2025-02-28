import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function PUT(req, { params }) {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db("yourDatabase");
    const collection = db.collection("cars");

    const carId = params.id;
    const formData = await req.formData();
    const updateData = {};

    formData.forEach((value, key) => {
      updateData[key] = value;
    });

    const result = await collection.updateOne({ _id: carId }, { $set: updateData });

    return NextResponse.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
