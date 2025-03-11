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


export async function signup(state: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = SignupFormSchema.safeParse(rawData);
  
    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { email, password, role, idCard, name, address } = validatedFields.data
    console.log(validatedFields.data)

    const userCollection = await getCollection("users")
    if(!userCollection) {
      return {errors: {email: "Error occur while connectig to User Collection"}}
    }
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
    redirect(`/auth/verify-otp?email=${email}`);
}


export async function login(state: any, formData: FormData){
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
      })
      if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
      }
    const {email, password} = validatedFields.data

      const userCollection = await getCollection("users")
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
}


export async function logout(): Promise<void> {
    const session = (await cookies()).get('session')?.value;
  
    if (session) {
      const payload = await decrypt(session);
  
      if (payload?.userId) {
        const userCollection = await getCollection("users")
        if(!userCollection) {
          return {errors: {email: "Error occur while connectig to User Collection"}}
        }
            await userCollection.updateOne(
                { _id: new ObjectId(payload.userId) },
                { $set: { status: 'inactive' } }
              );
      }
    }
    deleteSession()
    redirect('/auth/login')
}