import PlusButton from "@/components/button-plus";
import GoalList from "@/components/goal-list";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-screen-md flex flex-col p-5 gap-3">
      <h1 className="text-center font-bold">Task</h1>
      <Link href={"/test"}>test</Link>
      <GoalList />
      <PlusButton url={"/goal/add"} />
    </div>
  );
}
