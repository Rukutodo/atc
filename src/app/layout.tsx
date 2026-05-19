import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acharya Tutorials | Premium Education for ICSE, SSC & CBSE",
  description: "Acharya Tutorials provides high-quality education for ICSE, SSC, and CBSE students. Expert home tutoring and spoken language courses in Visakhapatnam.",
  keywords: "Acharya Tutorials, ICSE Tuitions, SSC Tuitions, CBSE Tuitions, Spoken English, Spoken Hindi, Home Tutoring Visakhapatnam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
