import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const userCollection = await getCollection("users");
          const user = await userCollection.findOne({ email: credentials.email });

          if (!user) return null;
          const passwordMatch = await compare(credentials.password, user.password);

          if (!passwordMatch) return null;


          await userCollection.updateOne(
            { _id: user._id },
            { $set: { status: "active" } }
          );

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error(" Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      try {

        if (!token.id || typeof token.id !== "string") {
          console.error(" Invalid token ID:", token.id);
          return;
        }

        const userCollection = await getCollection("users");

        const result = await userCollection.updateOne(
          { _id: new ObjectId(token.id) },
          { $set: { status: "inactive" } }
        );

        console.log(`MongoDB Update Result:`, result);
      } catch (error) {
        console.error("Error while setting user inactive:", error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
