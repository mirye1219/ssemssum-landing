import type { Metadata, Viewport } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | 선생님이 쓰는 보육비서`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ["쌤씀", "보육비서", "알림장", "보육일지", "관찰일지", "주제계획안", "어린이집 교사", "유치원 교사"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    title: "선생님의 오늘이, 기록의 초안이 되도록. | 쌤씀",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "선생님의 오늘이, 기록의 초안이 되도록. | 쌤씀",
    description: SITE.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#fcfaf7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
