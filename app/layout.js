import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Course Management",
  description: "Manage your courses with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={`${inter.className} dark:bg-gray-600`}>
        <SessionWrapper>
            <Navbar />
        </SessionWrapper>
        {children}
      </body>

      <Script src="/js/main.js" />
    </html>
  );
}
