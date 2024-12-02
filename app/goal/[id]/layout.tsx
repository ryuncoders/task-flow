import { ItemProvider } from "@/contexts/item-context";

interface ILayout {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: ILayout) {
  return (
    <ItemProvider>
      <div className="relative">
        <main>{children}</main>
        {modal}
      </div>
    </ItemProvider>
  );
}
