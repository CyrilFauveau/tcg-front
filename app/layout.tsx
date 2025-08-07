import type { Metadata } from "next";
import "./globals.css";
import CustomRainbowKitProvider from "./CustomRainbowKitProvider";
import Layout from "@/components/shared/Layout";

export const metadata: Metadata = {
  title: "Pokemon TCG",
  description: "Pokemon trading card game application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-100">
        <CustomRainbowKitProvider>
          <Layout>
            {children}
          </Layout>
        </CustomRainbowKitProvider>
      </body>
    </html>
  );
}
