"use client";

import { ItemProvider } from "@/contexts/item-context";
import { IWorkItem } from "@/types/models";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();

  return (
    <ItemProvider>
      <div>
        <h1>Goal Id: {params.id}</h1>
        {children}
      </div>
    </ItemProvider>
  );
}
