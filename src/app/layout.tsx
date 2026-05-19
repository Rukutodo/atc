import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acharya Tutorials | Premium Education for ICSE, SSC & CBSE",
  description: "Acharya Tutorials provides high-quality education for ICSE, SSC, and CBSE students. Expert home tutoring and spoken language courses in Mumbai.",
  keywords: "Acharya Tutorials, ICSE Tuitions, SSC Tuitions, CBSE Tuitions, Spoken English, Spoken Hindi, Home Tutoring Mumbai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
