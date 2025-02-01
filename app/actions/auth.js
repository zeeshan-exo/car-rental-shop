'use server'
import { getCollection } from "@/lib/db";
import { SignupFormSchema, LoginformSchema } from "@/lib/definations";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

import bcrypt from 'bcrypt'


export async function signup(state, formData) {

    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, ...remaining } = validatedFields.data;
    console.log("Validated Fields: ", validatedFields);

    const userCollection = await getCollection("users");
    if (!userCollection) return { errors: { email: "Server error" } };

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        return {
            errors: {
                email: "Email already exists",
            },
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const results = await userCollection.insertOne({
        email,
        password: hashedPassword,
        ...remaining,
    });

    console.log(results);

    await createSession(results.insertedId.toString());

    redirect("/dashboard");
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

    await createSession(existingUser._id.toString())
    redirect ('/dashboard')

}

export async function logout() {
    deleteSession()
    redirect('/pages/login')
}