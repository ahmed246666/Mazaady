import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/general-blocks";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAZAADY - Home",
  description: "MAZAADY Frontend Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#F6F4F5]">
      <body className="antialiased" style={nunito.style}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
