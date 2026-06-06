import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareerNexus Pro | AI ATS & Interview Suite",
  description: "Enterprise Executive Career Accelerator Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-[#020C1B] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
