import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ClientLayout";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abhi Services — Web Development, SaaS & AI Solutions Company",
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
        url: "/logo.png", // add your image in public folder
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
    images: ["/logo.png"],
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
   <head>
  <link rel="preload" as="image" href="/_next/image?url=%2Fhero_bg.webp&w=750&q=60" fetchPriority="high" />
  <link rel="preconnect" href="https://images.unsplash.com" />
  <link rel="dns-prefetch" href="https://images.unsplash.com" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  />

  <link rel="preconnect" href="https://res.cloudinary.com" />

  <link rel="icon" type="image/png" href="/logo.png" />
</head>

      <body suppressHydrationWarning className="min-h-full flex flex-col">
        
        <ScrollToTop/>
        <Navbar/>
        {children}
        <Footer/>

      <Script src="https://www.googletagmanager.com/gtag/js" strategy="lazyOnload" />
        </body>
    </html>
  );
}
