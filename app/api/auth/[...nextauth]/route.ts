
//correct 
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt"; 
// import { getCollection } from "@/lib/db";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }
        
//         try {
//           const userCollection = await getCollection("users");
          
//           // Find user by email - MongoDB query
//           const user = await userCollection.findOne({ 
//             email: credentials.email 
//           });
          
//           if (!user) {
//             return null;
//           }
          
          
//           const passwordMatch = await compare(credentials.password, user.password);
          
//           if (!passwordMatch) {
//             return null;
//           }
          
//           return {
//             id: user._id.toString(),
//             email: user.email,
//             name: user.name,
//             role: user.role
           
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: "/auth/login", 
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id;
//         session.user.role = token.role
//       }
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };



import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

