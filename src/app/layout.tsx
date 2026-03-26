import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Using Inter for a clean, modern aesthetic
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Golf Charity Subscription | Digital Heroes",
  description: "Track your scores, win prizes, and support great causes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={cn(
          "min-h-screen bg-neutral-50 font-sans text-neutral-900",
          inter.variable,
        )}
      >
        {/* We will inject Context Providers here in a later commit */}
        <main className="flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
