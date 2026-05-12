import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOA — A different kind of energy",
  description: "Renewable energy wheeling for a sustainable future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
