import { getWorkItem } from "@/app/api/data";
import WorkList from "@/components/work-item/work-list";
import { useParams } from "next/navigation";

export default async function WorkItem({ params }: { params: { id: string } }) {
  const workList = await getWorkItem(+params.id!);
  return (
    <div>
      <WorkList workList={workList} />
    </div>
  );
}
