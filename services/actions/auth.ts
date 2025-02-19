'use server'
import { getCollection } from "@/lib/db";
import { SignupFormSchema, LoginformSchema, SignupType } from "@/lib/definations/authDefinations";
import { createSession, deleteSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import bcrypt from "bcrypt"

// interface User {
//     email: string;
//     password: string;
//     role: 'vendor' | 'customer';
//     name: string;
//     cars_quantity?: string;
//     idCard?: string;
//     address?: string;
//     status: string
//   }


export async function signup(state: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());

    const validatedFields = SignupFormSchema.safeParse(rawData);
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors,};
    }
    const { email, password, role, idCard, name, address } = validatedFields.data;
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
    const userData: SignupType = {
        email,
        name,
        password: hashedPassword,
        role,
        status: "inactive", 
    };

    if (role === "vendor") {
        if (idCard) userData.idCard = idCard;
        if (address) userData.address = address;
    }
    await userCollection.insertOne(userData);
    redirect("/pages/login");
}

export async function login(state: any, formData: FormData){
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
            errors:{email: "Email does not exist "}
        }
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password)
    if(!isPasswordValid){
        return{
            errors:{ email:"Invalid email or password"}
        }
    }
 
    await userCollection.updateOne(
        {email},
        {$set: {status: "active"}}
    )

    await createSession(existingUser._id.toString(), existingUser.name.toString(), existingUser.email.toString(), existingUser.role.toString())
    const session = (await cookies()).get('session')?.value;
    const payload = await decrypt(session);
    {payload?.role==="customer"?
        redirect ('/dashboard'):  redirect ('/vendor')
    }
}


export async function logout(): Promise<void> {
    const session = (await cookies()).get('session')?.value;
  
    if (session) {
      const payload = await decrypt(session);
  
      if (payload?.userId) {
        const userCollection = await getCollection("users");
        if(userCollection){
            await userCollection.updateOne(
                { _id: new ObjectId(payload.userId) },
                { $set: { status: 'inactive' } }
              );
        }
      }
    }
    deleteSession()
    redirect('/pages/login')
}

