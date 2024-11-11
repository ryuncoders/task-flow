"use client";

import GoalComponents from "@/components/goal-components";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkItem, IWorkItem } from "@/app/api/data";
import { addWorkItem } from "@/app/work-item/[id]/actions";

export default function WorkList({ workList }: { workList: IWorkItem[] }) {
  const params = useParams();
  // const workItems = await getWorkItem(+params.id!);

  const [workItem, setWorkItem] = useState<IWorkItem[]>(workList);
  // const [optimisticWorkItem, setOptimisticWorkItem] = useOptimistic(workItem, );
  const onSubmitHandle = async (event: any) => {
    event.preventDefault();
    console.log(event.target[0].value);
    setWorkItem((prev) => [...prev, { id: 100, title: event.target[0].value }]);
    await addWorkItem(new FormData(event.target), +params.id!);
  };
  return (
    <div className="flex flex-col gap-3 p-5">
      <GoalComponents title={"title"} description={"descritpion"} period={4} />
      <form onSubmit={onSubmitHandle}>
        <input type="text" name="title" placeholder="write work item" />
        <button type="submit">Submit</button>
      </form>
      <div className="flex flex-col gap-1">
        {workItem.map((item) => (
          <span key={item.id}>{item.title}</span>
        ))}
      </div>
    </div>
  );
}
