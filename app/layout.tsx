"use client";

import { RecoilRoot } from "recoil";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

// QueryClient 생성
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className="flex">{children}</body>
        </html>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
