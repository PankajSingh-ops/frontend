import type { Metadata, Viewport } from "next";
import { Anton, Poppins } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ankur Chandrakant | Cybersecurity Expert & Social Entrepreneur",
  description:
    "Ankur Chandrakant is a cybersecurity and digital forensics specialist, speaker and social entrepreneur working at the intersection of digital safety, technology and social change.",
  openGraph: {
    title: "Ankur Chandrakant | Cybersecurity Expert",
    description: "Decoding Digital Threats. Protecting People. Creating Impact.",
    type: "website",
  },
  icons: {
    icon: "/ankur logo.webp",
  },
};

export const viewport: Viewport = {
  themeColor: "#060d1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${poppins.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-bg text-text font-sans antialiased overflow-x-hidden selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
