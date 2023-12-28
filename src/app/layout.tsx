import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import "@/styles/styles.css";
import Header from "@/ui/header/header";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import Footer from "@/ui/footer/footer";
import MobileNavigationButton from "@/ui/mobile-navigation/mobile-navigation-button/mobile-navigation-button";

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
          <Toaster
            toastOptions={{
              duration: 5000,
              style: {
                border: "7px double var(--color-gold-300)",
                color: "var(--color-gold-300)",
                background: "var(--color-brand-400)",
                padding: "1.2rem",
                textAlign: "center",
              },
              error: {
                duration: 10000,
                style: {
                  border: "7px double var(--color-red-400)",
                  color: "var(--color-red-400)",
                  background: "var(--color-red-800)",
                },
              },
            }}
          />
          <MobileNavigationButton />
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
