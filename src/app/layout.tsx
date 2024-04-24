import type { Metadata } from "next";
import "./globals.css";
import { AlertProvider } from "./_contexts/AlertContext"; 

export const metadata: Metadata = {
  title: "school camping",
  description: "cloud & easy backend project build",
  icons: {
    icon: "/assets/img/gbsw.ico"
  }
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
