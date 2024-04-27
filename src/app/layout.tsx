import type { Metadata } from "next";
import "./globals.css";
import { AlertProvider } from "./_contexts/AlertContext"; 
import { headers } from "next/headers";

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

  const headersList = headers();
  const userAgent = headersList.get('user-agent');

  // 
  let isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );
  return (
    <html lang="ko">
      {
        !isMobileView ?
      <body>
      <AlertProvider>
        {children}
      </AlertProvider>
      </body>
      :
      <></>
      }
    </html>
  );
}
