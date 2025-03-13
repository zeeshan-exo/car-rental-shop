// lib/auth-utils.ts - A utility file for server-side auth functions
import { getServerSession as nextAuthGetServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// A wrapper for getServerSession to make it easier to use in server actions
export async function getServerSession() {
  return await nextAuthGetServerSession(authOptions);
}