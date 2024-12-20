import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HIK & VEIJ - Photo Gallery",
  description: "The phtoto gallery of HIK & VEIJ, introduce the products of HIK & VEIJ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black`}>
        {children}
      </body>
    </html>
  );
}
