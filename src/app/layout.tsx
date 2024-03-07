"use client";

import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { WrapperStore } from "@/components/WrapperStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WrapperStore>
          <Navbar></Navbar>
          {children}
        </WrapperStore>
      </body>
    </html>
  );
}
