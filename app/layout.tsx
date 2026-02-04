import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
//@ts-ignore
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Learn purpose",
  description: "Just for learning purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        
        {children}
      </body>
    </html>
  );
}
