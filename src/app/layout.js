// layout.js (or layout.tsx)
"use client";
import GlobalState from "@/context";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import { useEffect } from "react";
import { Roboto } from "next/font/google";
import { CartProvider } from "@/context/cartContext";
import { metadata } from "./layout.server";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.smartsuppchat.com/loader.js?";
    script.async = true;
    script.onload = () => {
      window._smartsupp = window._smartsupp || {};
      window._smartsupp.key = "ee828a51cbc5caa49873922b9a55349b8d9f1e04";
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={roboto.className}>
        <AuthProvider>
          <GlobalState>
            <CartProvider>{children}</CartProvider>
          </GlobalState>
        </AuthProvider>
      </body>
    </html>
  );
}
