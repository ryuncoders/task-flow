"use client";

import { ITimeLine, IWorkItem } from "@/types/models";
import { createContext, ReactNode, useContext, useState } from "react";

interface ItemContextProps {
  workItems: IWorkItem[];
  setWorkItems: React.Dispatch<React.SetStateAction<IWorkItem[]>>;
  gridTimeLine: string[][];
  setGridTimeLine: React.Dispatch<React.SetStateAction<string[][]>>;
}

interface ItemProviderProps {
  children: ReactNode;
}

const defaultTimeLine = Array.from(Array(3), () => Array(7).fill("#ffffff"));
const ItemContext = createContext<ItemContextProps | undefined>(undefined);

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const [workItems, setWorkItems] = useState<IWorkItem[]>([]);
  const [gridTimeLine, setGridTimeLine] = useState<string[][]>(defaultTimeLine);

  return (
    <ItemContext.Provider
      value={{
        workItems,
        setWorkItems,
        gridTimeLine,
        setGridTimeLine,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
