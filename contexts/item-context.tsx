"use client";

import { ITimeLine, IWorkItem } from "@/types/models";
import { createContext, ReactNode, useContext, useState } from "react";

interface ItemContextProps {
  workItems: IWorkItem[];
  setWorkItems: React.Dispatch<React.SetStateAction<IWorkItem[]>>;
  newTimeLine: ITimeLine | null;
  setNewTimeLine: React.Dispatch<React.SetStateAction<ITimeLine | null>>;
  defaultTimeLine: string[][];
  setDefaultTimeLine: React.Dispatch<React.SetStateAction<string[][]>>;
}

interface ItemProviderProps {
  children: ReactNode;
}

const ItemContext = createContext<ItemContextProps | undefined>(undefined);

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const [workItems, setWorkItems] = useState<IWorkItem[]>([]);
  const [newTimeLine, setNewTimeLine] = useState<ITimeLine | null>(null);
  const [defaultTimeLine, setDefaultTimeLine] = useState<string[][]>([]);

  return (
    <ItemContext.Provider
      value={{
        workItems,
        setWorkItems,
        newTimeLine,
        setNewTimeLine,
        defaultTimeLine,
        setDefaultTimeLine,
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
