import { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { clientPromise, getCollection } from "@/lib/db";

// Declare module augmentations for TypeScript
declare module "next-auth" {
  interface User {
    role?: string;
  }
  
  interface Session {
    user: {
      id: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    email?: string | null;
  }
}

// Define authOptions without direct reference to dynamic APIs
export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const userCollection = await getCollection("users");
          if (!userCollection) {
            console.error("Failed to find user collection");
            return null;
          }
          const user = await userCollection.findOne({
            email: credentials?.email,
          });
          if (!user) {
            return null;
          }
          const isValidPassword = await compare(
            credentials!.password,
            user.password
          );
          if (!isValidPassword) {
            return null;
          }
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id || token.sub || "";
        session.user.role = token.role;
      }
      return session;
    },
  },
  
  events: {
    async signIn(message) {
      try {
        const userEmail = message.user.email;
        if (!userEmail) {
          console.warn("No email found in sign-in event");
          return;
        }
        
        const userCollection = await getCollection("users");
        if (userCollection) {
          await userCollection.updateOne(
            { email: userEmail },
            { $set: { status: "active" } }
          );
        }
      } catch (error) {
        console.error("Error updating status on signIn:", error);
      }
    },
    async signOut({ token }) {
      try {
        if (!token || !token.email) {
          console.warn("No valid email found in token during signOut event");
          return;
        }
        
        const userEmail = token.email;
        const userCollection = await getCollection("users");
        if (userCollection) {
          await userCollection.updateOne(
            { email: userEmail },
            { $set: { status: "inactive" } }
          );
        }
      } catch (error) {
        console.error("Error updating status on signOut:", error);
      }
    },
  },
};