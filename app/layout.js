import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Course Management",
  description: "Manage your courses with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        {children}
      </body>

      <Script src="js/main.js" />
    </html>
  );
}
