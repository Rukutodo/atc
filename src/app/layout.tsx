import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { supabaseAdmin } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://acharyatutorials.com";

export const metadata: Metadata = {
  title: {
    default: "Acharya Tutorials | Best Home Tuitions & Online Classes in Visakhapatnam",
    template: "%s | Acharya Tutorials"
  },
  description: "Acharya Tutorials: #1 choice for Home Tuitions & Online Classes globally. Specialized in ICSE, CBSE & SSC for All Classes (1st-12th). 25+ years of excellence in Visakhapatnam.",
  keywords: [
    "Acharya Tutorials", 
    "Home Tuitions in Visakhapatnam", 
    "Online Classes for all subjects", 
    "Best tutors in Vizag for all classes", 
    "Private tutors for 11th and 12th", 
    "K-12 coaching Visakhapatnam", 
    "IIT JEE Foundation Vizag",
    "NEET Foundation coaching",
    "Home tutoring service Andhra Pradesh",
    "Reasonable price online tuitions",
    "SSC coaching Visakhapatnam",
    "Spoken English courses Online"
  ],
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
    title: "Acharya Tutorials | Premium Education for All Classes in Visakhapatnam",
    description: "Expert home tutoring in Vizag and premium online classes for all students (1st to 12th grade). 25+ years of teaching excellence.",
    siteName: "Acharya Tutorials",
    images: [
      {
        url: "/assets/StudySessionInACozyRoom.png",
        width: 1200,
        height: 630,
        alt: "Acharya Tutorials - Education Excellence for All Ages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acharya Tutorials | Leading Tutors for All Classes",
    description: "Personalized Home Tuitions in Vizag & Interactive Online Classes for All Grades (1st-12th).",
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

  // Enhanced JSON-LD Structured Data for Local + Global SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Acharya Tutorials",
    "image": `${siteUrl}/assets/StudySessionInACozyRoom.png`,
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": "+91 9346801502",
    "priceRange": "$$",
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
    "areaServed": [
      {
        "@type": "City",
        "name": "Visakhapatnam",
        "sameAs": "https://en.wikipedia.org/wiki/Visakhapatnam"
      },
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "VirtualLocation",
        "name": "Online/Worldwide"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Comprehensive Tutoring Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Home Tuitions for All Classes (1st-12th)"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Online Classes for ICSE, CBSE & SSC"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Specialized Foundation for Competitive Exams"
          }
        }
      ]
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ],
      "opens": "08:00",
      "closes": "21:00"
    },
    "description": "Acharya Tutorials provides top-rated Home Tuitions in Visakhapatnam and high-quality Online Classes globally for All Classes (1st to 12th). Specialized in ICSE, SSC, and CBSE boards."
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
