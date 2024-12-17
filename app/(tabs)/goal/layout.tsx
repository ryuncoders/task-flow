import { ItemProvider } from "@/contexts/item-context";

interface ILayout {
  children: React.ReactNode;
  addGoalModal: React.ReactNode;
}

export default function Layout({ children, addGoalModal }: ILayout) {
  return (
    <ItemProvider>
      <main>{children}</main>
      {addGoalModal}
    </ItemProvider>
  );
}
