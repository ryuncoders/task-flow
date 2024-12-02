import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <div className="relative">
      <main>{children}</main>
      {modal}
    </div>
  );
}
