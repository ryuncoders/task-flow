"use client";

import HeaderTitle from "@/components/header-title";
import Nav from "@/components/nav";
import { useState } from "react";

export default function TabsLayout({
  children,
  todo, // 병렬 경로 추가
}: {
  children: React.ReactNode;
  todo: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`grid  ${
        isOpen ? "grid-cols-[8fr_3fr]" : "grid-cols-1"
      }  h-screen w-full`}
    >
      <div>
        <Nav />
        <HeaderTitle />
        {/* <button
          onClick={handleOpen}
          className="fixed top-10 right-10 bg-blue-300 p-2 rounded-xl"
        >
          button
        </button> */}
        <main className="flex-1 bg-white">{children}</main>
      </div>
      <aside className={`bg-neutral-50  w-full ${isOpen ? "flex" : "hidden"}`}>
        {todo || <p>Todo is empty.</p>}
      </aside>
    </div>
  );
}
