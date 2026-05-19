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

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the global theme from the database at request time
  let activeTheme = 'light';
  try {
    const { data } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'active_theme')
      .single();
    
    if (data?.value) {
      activeTheme = data.value;
    }
  } catch (e) {
    console.error("Layout: Failed to fetch theme from DB", e);
  }

  return (
    <html lang="en" className={`scroll-smooth ${activeTheme}`} data-theme={activeTheme}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Direct DB-to-DOM sync
                  var theme = '${activeTheme}';
                  document.documentElement.className = 'scroll-smooth ' + theme;
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
