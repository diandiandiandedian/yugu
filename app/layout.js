import { Inter } from "next/font/google";
import "./globals.css";
// import { TonConnectUIProvider } from '@tonconnect/ui-react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "yugo",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    {/*<TonConnectUIProvider manifestUrl="http://localhost:3001/tonconnect-manifest.json">*/}

    <body className={inter.className}>{children}</body>
    {/*</TonConnectUIProvider>*/}

    </html>
  );
}
