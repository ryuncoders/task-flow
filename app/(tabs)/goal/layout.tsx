import { ItemProvider } from "@/contexts/item-context";

interface ILayout {
  children: React.ReactNode;
  addGoalModal: React.ReactNode;
}

export default function Layout({ children, addGoalModal }: ILayout) {
  return (
    <div>
      <main>{children}</main>
      {addGoalModal}
    </div>
  );
}
