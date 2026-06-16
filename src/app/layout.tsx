import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NIN9ONE World",
  description: "Interactive 3D world prototype for NIN9ONE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
