import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "小型Webツール集",
    template: "%s | 小型Webツール集",
  },
  description: "ログイン不要で使える、暮らし・仕事・文章・開発向けの小型Webツール集です。",
  verification: {
    google: "GR9mMysiOP8G8uO_ZCEXL6Jtfok6giR1SrfB3BBWvO4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
