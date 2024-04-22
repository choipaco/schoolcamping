import type { Metadata } from "next";
import "./globals.css";
import { AlertProvider } from "./_contexts/AlertContext"; 

export const metadata: Metadata = {
  title: "school camping",
  description: "cloud & easy backend project build",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
      <AlertProvider>
        {children}
      </AlertProvider>
      </body>
    </html>
  );
}
