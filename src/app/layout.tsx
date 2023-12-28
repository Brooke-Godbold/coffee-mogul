import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import "@/styles/styles.css";
import Header from "@/ui/header/header";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import Footer from "@/ui/footer/footer";

const mainFont = Bitter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-main",
});

export const mainFontClass = mainFont.variable;

export const metadata: Metadata = {
  title: "CoffeeMogul",
  description: "Kings of Coffee!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mainFont.variable} font-sans`}>
      <body>
        <Providers>
          <Toaster />
          <Header />
          <main>
            <>
              {children}
              <Footer />
            </>
          </main>
        </Providers>
      </body>
    </html>
  );
}
