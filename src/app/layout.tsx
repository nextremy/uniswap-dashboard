import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./_Header";
import { Providers } from "./_Providers";
import "./globals.css";

export const metadata: Metadata = { title: "Uniswap Dashboard" };

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 ${inter.className}`}
      >
        <Providers>
          <div>
            <Header />
            {props.children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
