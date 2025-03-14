import { getCollection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    console.log("otp verifiication email....")
    const {email, otp} = await req.json()
    const userCollection = await getCollection("users")

    if(!userCollection){
        return NextResponse.json({error: "No Collection with user name"}, {status: 400})
    }
 
    const user = await userCollection.findOne({email})
    if(!user || user.otp !== otp || new Date() > new Date(user.otpExpires)){
        return NextResponse.json({error: "Token expires or no OTP found"}, {status: 400})
    }

    await userCollection.updateOne({email}, {$set:  {status:"active", otp: "verified", otpExpires: null}})

    return NextResponse.json({success: true})
}