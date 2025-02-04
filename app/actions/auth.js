'use server'
import { getCollection } from "@/lib/db";
import { SignupFormSchema, LoginformSchema } from "@/lib/definations";
import { createSession, deleteSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import bcrypt from 'bcrypt'


export async function signup(state, formData) {
    const rawData = Object.fromEntries(formData.entries());

    const validatedFields = SignupFormSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, role, cars_quantity, idCard, name, address } = validatedFields.data;
    const userCollection = await getCollection("users");
    if (!userCollection) return { errors: { email: "User collection not found" } };

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        return {
            errors: {
                email: "Email already exists",
            },
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        email,
        name,
        password: hashedPassword,
        role,
        status: "inactive", 
    };

    if (role === "vendor") {
        if (cars_quantity) userData.cars_quantity = cars_quantity;
        if (idCard) userData.idCard = idCard;
        if (address) userData.address = address;
    }
    await userCollection.insertOne(userData);
    redirect("/pages/login");
}


  

export async function login(state, formData){
    const validatedFields = LoginformSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
      })
      if(!validatedFields.success){
          return {
              errors: validatedFields.error.flatten().fieldErrors,
            }
  }
    const {email, password} = validatedFields.data

    const userCollection = await getCollection('users')
    if(!userCollection) return {errors:{email: "sever error"}}
    const existingUser = await userCollection.findOne({email})
    if(!existingUser) {
        return{
            errors:{
                email: "Email does not exist "
                
            }
        }
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password)
    if(!isPasswordValid){
        return{
            errors:{
                email:"Invalid email or password"
            }
        }
    }
 
    await userCollection.updateOne(
        {email},
        {$set: {status: "active"}}

    )

    await createSession(existingUser._id.toString(), existingUser.role.toString())
    redirect ('/dashboard')

}

export async function logout() {
    const session = (await cookies()).get('session')?.value;

    if (session) {
        const payload = await decrypt(session);

        if (payload?.userId) {
            const userCollection = await getCollection("users");

            await userCollection.updateOne(
                { _id: new ObjectId(payload.userId) },  
                { $set: { status: 'inactive' } }       
            );
        }
    }

    deleteSession()
    redirect('/pages/login')
}