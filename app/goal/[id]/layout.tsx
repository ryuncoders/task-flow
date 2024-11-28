import { ItemProvider } from "@/contexts/item-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ItemProvider>
      <div>{children}</div>
    </ItemProvider>
  );
}
