import type { Metadata } from "next";
import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "QL Notes Filesystem App",
  description: "QL Notes Filesystem App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
