import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import { Header } from "@/components/my-components/Header";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Awesome Weather App",
  description: "Truly the best weather app in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ClearView Horizons</title>
      </head>
      <body className={cn(
          "min-h-screen bg-background font-monserrat antialiased bg-custom-bg text-primary-light",
          fontSans.variable
        )}>
          <Header />
          {children}
          </body>
    </html>
  );
}
