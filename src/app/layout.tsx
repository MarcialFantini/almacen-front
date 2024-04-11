"use client";

import "./globals.css";
import { WrapperStore } from "@/components/WrapperStore";
import { Providers } from "./providers";
import { Footer } from "@/components/Footer";
import { NavbarComponent } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100vh]">
        <WrapperStore>
          <Providers>
            <NavbarComponent></NavbarComponent>
            {children}
          </Providers>
        </WrapperStore>
        <Footer></Footer>
      </body>
    </html>
  );
}
