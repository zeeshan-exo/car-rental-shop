'use server'
import { getCollection } from "@/lib/db";
import { SignupFormSchema ,SignupType} from "@/lib/definations/authDefinations";
import { redirect } from "next/navigation";
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

      const userCollection = await getCollection("users")
      if(!userCollection) throw new Error ("Failed to find User Collection")
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