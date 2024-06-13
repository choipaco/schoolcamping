import type { Metadata } from "next";
import "./globals.css";
import { AlertProvider } from "./_contexts/AlertContext"; 
import { headers } from "next/headers";

export const metadata: Metadata = {
  metadataBase: new URL('https://camping.gbsw.hs.kr'),
  title: "스쿨캠핑",
  description: "스쿨캠핑 예약사이트 입니다",
  icons: {
    icon: "/assets/img/gbsw.ico"
  },
  openGraph: {
    images: new URL("https://cdn-icons-png.flaticon.com/512/1600/1600667.png"),
    type: "website"
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
      <>
      pc환경에서만 이용 가능합니다.
      </>
      }
    </html>
  );
}
