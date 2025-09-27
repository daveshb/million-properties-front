import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";



const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Million Properties",
  description: "Find your dream property",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
