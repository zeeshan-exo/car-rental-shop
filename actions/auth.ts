'use server'
import { getCollection } from "@/lib/db";
import { SignupFormSchema, LoginFormSchema, SignupType, LoginType } from "@/lib/definations/authDefinations";
import { createSession, deleteSession } from "@/lib/session";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import bcrypt from "bcrypt"
import { sendMail } from "@/lib/email";
import { randomInt } from "crypto";
import ejs from 'ejs'
import path from "path";

async function getUserCollection() {
  const collection = await getCollection("users");
  if (!collection) throw new Error("User collection not found");
  return collection;
}

export async function signup(state: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = SignupFormSchema.safeParse(rawData);
  
    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }
    
    const data : SignupType = validatedFields.data
    const { email, password, role, idCard, name, address } = data;

    try {
      const userCollection = await getUserCollection()
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return { errors: { email: "Email already exists" } };
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = randomInt(100000, 999999).toString(); 
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  
    const newUser = {
      email,
      name,
      password: hashedPassword,
      role,
      status: "inactive",
      otp,
      otpExpires,
      ...(role === "vendor" && {idCard, address})
    };
  
    // if (role === "vendor") {
    //   if (idCard) newUser.idCard = idCard;
    //   if (address) newUser.address = address;
    // }
    await userCollection.insertOne(newUser);

    const templatePath = path.join(process.cwd(), "templates", "verifyEmail.ejs")
    const emailHtml = await ejs.renderFile(templatePath, {name, otp})

    await sendMail({
      to: email,
      subject: "Verify Your Email",
      message: emailHtml, 
    });
    redirect(`/pages/verify-otp?email=${email}`);
    } catch (error) {
      return {errors: {email: "Server Error during singup"}}
    }
}


export async function login(state: any, formData: FormData){
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
      })
      if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
      }
    const data:LoginType = validatedFields.data
    const {email, password} = data

    try {
      const userCollection = await getUserCollection()
      const user = await userCollection.findOne({email})
      if (!user) {
        return { errors: { email: "Email does not exist" } };
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return { errors: { email: "Invalid email or password" } };
      }
   
      await userCollection.updateOne({ email }, { $set: { status: "active" } });
  
      await createSession(user._id.toString(), user.name, user.email, user.role)
      const session = (await cookies()).get('session')?.value;
      const payload = await decrypt(session);
        redirect(payload?.role === "customer" ? "/dashboard" : "/vendor");
    } catch (error) {
      return { errors: { email: "Server error during login" } };
    }

}


export async function logout(): Promise<void> {
    const session = (await cookies()).get('session')?.value;
  
    if (session) {
      const payload = await decrypt(session);
  
      if (payload?.userId) {
        const userCollection = await getUserCollection()
            await userCollection.updateOne(
                { _id: new ObjectId(payload.userId) },
                { $set: { status: 'inactive' } }
              );
      }
    }
    deleteSession()
    redirect('/auth/login')
}