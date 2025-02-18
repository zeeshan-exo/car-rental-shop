
// import { getCollection } from "@/lib/db";
// import bcrypt from 'bcrypt';
// import { createSession, deleteSession } from "@/lib/session";

// export async function registerUser(data) {
//   const userCollection = await getCollection("users");
//   if (!userCollection) throw new Error("User collection not found");

//   const existingUser = await userCollection.findOne({ email: data.email });
//   if (existingUser) throw new Error("Email already exists");

//   const hashedPassword = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS || 10));
//   const userData = {
//     email: data.email,
//     name: data.name,
//     password: hashedPassword,
//     role: data.role,
//     status: "inactive",
    
//   };
//   if (role === "vendor") {
//     if (cars_quantity) userData.cars_quantity = cars_quantity;
//     if (idCard) userData.idCard = idCard;
//     if (address) userData.address = address;
// }

//   await userCollection.insertOne(userData);
//   return userData;
// }

// export async function loginUser(email, password) {
//   const userCollection = await getCollection("users");
//   if (!userCollection) throw new Error("Server error");

//   const user = await userCollection.findOne({ email });
//   if (!user) throw new Error("Invalid email or password");

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) throw new Error("Invalid email or password");

//   await userCollection.updateOne({ email }, { $set: { status: "active" } });
//   await createSession(user._id.toString(), user.name, user.role);
//   return user;
// }
