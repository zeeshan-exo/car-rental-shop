import NextAuth, { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { clientPromise, getCollection } from "@/lib/db";

export const authOptions: AuthOptions = {
  // Use a type assertion here to override the adapter's type mismatch
  adapter: MongoDBAdapter(clientPromise) as unknown as AuthOptions["adapter"],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userCollection = await getCollection("users");
        if (!userCollection) throw new Error("Failed to find user collection.");

        const user = await userCollection.findOne({ email: credentials?.email });
        if (!user) throw new Error("User not found");

        const isValidPassword = await compare(credentials!.password, user.password);
        if (!isValidPassword) throw new Error("Invalid Password");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  events: {
    async signIn(message) {
      try {
        const userCollection = await getCollection("users");
        if (userCollection) {
          await userCollection.updateOne(
            { email: message.user.email },
            { $set: { status: "active" } }
          );
        }
      } catch (error) {
        console.error("Error updating status on signIn:", error);
      }
    },
    async signOut(message) {
      try {
        const userEmail = message.user?.email;
        if (userEmail) {
          const userCollection = await getCollection("users");
          if (userCollection) {
            await userCollection.updateOne(
              { email: userEmail },
              { $set: { status: "inactive" } }
            );
          }
        } else {
          console.warn("No user email found in signOut event");
        }
      } catch (error) {
        console.error("Error updating status on signOut:", error);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
