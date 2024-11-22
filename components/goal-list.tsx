import { getGoal } from "@/app/api/data";
import GoalComponents from "./goal-components";
import Link from "next/link";
import { unstable_cache as nextCache } from "next/cache";

const getGoalsCache = nextCache(getGoal, ["goal-list"], { tags: ["goals"] });

export default async function GoalList() {
  const goals = await getGoalsCache();

  return (
    <div>
      <h1 className="underline font-semibold">goal list</h1>
      <div className="flex flex-col gap-1 ">
        {goals.map((goal) => (
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
