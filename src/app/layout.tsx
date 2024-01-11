import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YAY",
  description: "Todo list application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={
          inter.className + " antialiased -tracking-[0.06375rem] bg-[#0f0e0e]"
        }
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
