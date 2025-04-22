"use client"
import "./globals.css";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { AuthProvider } from "@/provider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// export const metadata: Metadata = {
//   title: "AutoNex",
//   description: "Rent cars easily with our platform",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
         {children}

          <Toaster richColors position="top-right"/>
        </ReCaptchaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
