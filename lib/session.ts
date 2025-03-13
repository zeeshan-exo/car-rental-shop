// import 'server-only';
// import { SignJWT, jwtVerify, JWTPayload } from 'jose';
// import { cookies } from 'next/headers';

// const secretKey = process.env.SESSION_SECRET;
// if (!secretKey) {
//   throw new Error('SESSION_SECRET is not defined in environment variables');
// }
// const encodedKey = new TextEncoder().encode(secretKey);

// interface SessionPayload extends JWTPayload {
//   userId: string;
//   name: string;
//   email: string;
//   role: string;
//   expiresAt: Date;
// }


// export async function encrypt(payload: SessionPayload): Promise<string> {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setExpirationTime('7d')
//     .setIssuedAt()
//     .sign(encodedKey);
// }

// export async function decrypt(session: string | undefined): Promise<SessionPayload | null> {
//   if (!session) return null;

//   try {
//     const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
//       algorithms: ['HS256'],
//     });
//     return payload;
//   } catch (error) {
//     console.error('Failed to verify session', error);
//     return null;
//   }
// }

// // Create session
// export async function createSession(userId: string, name: string, email: string, role: string): Promise<void> {
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//   const session = await encrypt({ userId, name, email, role, expiresAt });

//   const cookieStore = await cookies(); 
//   cookieStore.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   });
// }

// export async function updateSession(): Promise<SessionPayload | null> {
//   const cookieStore = await cookies(); 
//   const session = cookieStore.get('session')?.value;
//   const payload = await decrypt(session);

//   if (!session || !payload) return null;

//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
//   cookieStore.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   });

//   return payload;
// }

// export async function deleteSession(): Promise<void> {
//   const cookieStore = await cookies();
//   cookieStore.delete('session');
// }
