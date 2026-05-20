import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { supabaseAdmin } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://acharyatutorials.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Acharya Tutorials | Best ICSE, CBSE & SSC Coaching in Visakhapatnam",
    template: "%s | Acharya Tutorials"
  },
  description: "Acharya Tutorials offers premium education for ICSE, SSC, and CBSE students up to 10th grade. Specialist in Home Tutoring and Spoken English in Visakhapatnam with 25+ years of experience.",
  keywords: ["Acharya Tutorials", "Best coaching in Visakhapatnam", "ICSE Tuitions Vizag", "CBSE coaching Visakhapatnam", "SSC coaching Vizag", "Home tutors in Visakhapatnam", "Spoken English classes Vizag", "Reasonable price tuitions"],
  authors: [{ name: "Acharya Tutorials" }],
  creator: "Acharya Tutorials",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Acharya Tutorials | Premium Education in Visakhapatnam",
    description: "Expert home tutoring and classroom coaching for ICSE, CBSE, and SSC students. 25+ years of teaching excellence.",
    siteName: "Acharya Tutorials",
    images: [
      {
        url: "/assets/StudySessionInACozyRoom.png",
        width: 1200,
        height: 630,
        alt: "Acharya Tutorials - Empowering Minds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acharya Tutorials | Premium Education in Visakhapatnam",
    description: "Expert home tutoring and classroom coaching for ICSE, CBSE, and SSC students.",
    images: ["/assets/StudySessionInACozyRoom.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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

  // Schema.org Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Acharya Tutorials",
    "image": `${siteUrl}/assets/StudySessionInACozyRoom.png`,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": "+91 9346801502",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Visakhapatnam",
      "addressLocality": "Visakhapatnam",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "530001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.6868,
      "longitude": 83.2185
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.facebook.com/acharyatutorials",
      "https://www.instagram.com/acharyatutorials"
    ],
    "description": "Best quality education at reasonable price for ICSE, SSC, and CBSE students up to 10th grade. Specialist in Home Tutoring in Visakhapatnam."
  };

  return (
    <html lang="en" className={`scroll-smooth ${activeTheme}`} data-theme={activeTheme}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
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
