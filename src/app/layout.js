import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abhi Services | Web Development, SaaS & Digital Solutions",
  description:
    "Abhi Services is a modern digital agency offering web development, SaaS solutions, UI/UX design, and scalable applications. We build high-performance, client-focused digital products.",
  
  keywords: [
    "Abhi Services",
    "Web Development",
    "MERN Stack Developer",
    "Next.js Development",
    "SaaS Development",
    "UI UX Design",
    "React Developer",
    "Freelance Web Developer India",
    "Full Stack Development",
    "Custom Web Applications"
  ],

  authors: [{ name: "Abhi Services" }],
  creator: "Abhi Services",
  publisher: "Abhi Services",

  metadataBase: new URL("https://abhi.services"),

  openGraph: {
    title: "Abhi Services | Build Modern Digital Products",
    description:
      "We design and develop scalable web applications, SaaS platforms, and high-performance digital solutions for modern businesses.",
    url: "https://abhi.services",
    siteName: "Abhi Services",
    images: [
      {
        url: "/og-image.png", // add your image in public folder
        width: 1200,
        height: 630,
        alt: "Abhi Services - Digital Agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Abhi Services | Web & SaaS Development",
    description:
      "Premium web development, SaaS solutions, and UI/UX design for modern businesses.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head> 
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   



<link rel="icon" type="image/png" href="/logo.png"/>
    <title>Abhi Services</title>
  </head>
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}</body>
    </html>
  );
}
