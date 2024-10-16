import "./globals.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Blaq Kouture",
  description: "Blaqkouture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
