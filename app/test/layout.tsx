"use client";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col gap-6">
        <div>{children}</div>
        {modal}
      </div>
    </QueryClientProvider>
  );
}
