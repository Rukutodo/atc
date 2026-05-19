import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { supabaseAdmin } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acharya Tutorials | Premium Education for ICSE, SSC & CBSE",
  description: "Acharya Tutorials provides high-quality education for ICSE, SSC, and CBSE students. Expert home tutoring and spoken language courses in Visakhapatnam.",
  keywords: "Acharya Tutorials, ICSE Tuitions, SSC Tuitions, CBSE Tuitions, Spoken English, Spoken Hindi, Home Tutoring Visakhapatnam",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the global theme from the database at build/request time
  let initialTheme = 'light';
  try {
    const { data } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'active_theme')
      .single();
    if (data?.value) initialTheme = data.value;
  } catch (e) {}

  return (
    <html lang="en" className={`scroll-smooth ${initialTheme}`} data-theme={initialTheme}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || '${initialTheme}';
                  document.documentElement.classList.remove('light', 'dark', 'india');
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
