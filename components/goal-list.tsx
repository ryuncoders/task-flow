"use client";

import Link from "next/link";
import { useQuery } from "react-query";
import GoalComponents from "./goal-components";

async function fetchGoals() {
  const response = await fetch("/api/goal", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch goals");
  }

  const data = await response.json();
  return data.goals;
}

export default function GoalList() {
  const { data: goals, isLoading } = useQuery(["goals"], fetchGoals);

  if (isLoading) {
    return <div>goals</div>;
  }

  return (
    <div className=" w-full">
      <div className="grid grid-cols-3 gap-1 ">
        {goals.map((goal: any) => (
          <Link href={`/goal/${goal.id}`} key={goal.id}>
            <GoalComponents
              title={goal.title}
              description={goal.description || ""}
              period={goal.period}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
