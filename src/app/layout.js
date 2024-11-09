"use client";
import GlobalState from "@/context";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import { useEffect } from "react";
import { Roboto } from "next/font/google";
import { CartProvider } from "@/context/cartContext";
import { metadata } from "./layout.server";
import { WhatsApp } from "@mui/icons-material";
const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    // Load Smartsupp chat script
    const smartsuppScript = document.createElement("script");
    smartsuppScript.type = "text/javascript";
    smartsuppScript.src = "https://www.smartsuppchat.com/loader.js?";
    smartsuppScript.async = true;
    smartsuppScript.onload = () => {
      window._smartsupp = window._smartsupp || {};
      window._smartsupp.key = "ee828a51cbc5caa49873922b9a55349b8d9f1e04";
    };
    document.head.appendChild(smartsuppScript);

    // Load WhatsApp chat script
    const whatsappScript = document.createElement("script");
    whatsappScript.type = "text/javascript";
    whatsappScript.src = "https://web.whatsapp.com/s/widget.js";
    whatsappScript.async = true;
    document.head.appendChild(whatsappScript);

    // Clean up on component unmount
    return () => {
      document.head.removeChild(smartsuppScript);
      document.head.removeChild(whatsappScript);
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

        {/* WhatsApp chat button */}
        <div id="whatsapp-chat" className="whatsapp-chat">
          <a
            href="https://wa.me/+2349072561418"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp style={{ fontSize: "30px" }} />
          </a>
        </div>
      </body>
    </html>
  );
}
