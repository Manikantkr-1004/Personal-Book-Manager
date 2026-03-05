import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Personal Book Manager",
  description: "A Platform dedicated for users to have features like personal book manager.",
  icon: "/favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
        <Toaster position="top-center" duration={2500} />
      </body>
    </html>
  );
}
