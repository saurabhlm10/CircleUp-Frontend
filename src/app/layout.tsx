import Providers from "@/components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Home/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Circle Up",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <Providers>
          {/* <Sidebar /> */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
