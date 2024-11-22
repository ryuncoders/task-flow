import { ItemProvider } from "@/contexts/item-context";
import { IWorkItem } from "@/types/models";
import { useParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ItemProvider>
      <div>{children}</div>
    </ItemProvider>
  );
}
