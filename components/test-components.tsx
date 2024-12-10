"use client";

import { getWeeklyColors } from "@/lib/utils";
import { ITimeLine, IWorkItem } from "@/types/models";
import { useEffect, useState } from "react";

export default function TestComponent({
  workItems,
}: {
  workItems: IWorkItem[];
}) {
  const [error, setError] = useState<string | null>(null);
  const goalId = 1;
  const [test_workItems, setWorkItems] = useState<IWorkItem[]>(workItems);

  useEffect(() => {
    const updatedWorkItems = test_workItems.map((workItem: IWorkItem) => ({
      ...workItem,
      timeLines: workItem.timeLines.map((timeLine: ITimeLine) => ({
        ...timeLine,
        dateTimeLineColor: getWeeklyColors({
          dateRange: [timeLine.dateStart + "", timeLine.dateEnd + ""],
          color: timeLine.color,
        }),
      })),
    }));

    setWorkItems(updatedWorkItems);
  }, [goalId]);

  // 데이터가 로드되지 않았거나 에러가 있을 경우 처리
  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  if (workItems.length === 0) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>{workItems[0].title}</h1>
      <div>
        {workItems[0].timeLines.map((timeLine) =>
          timeLine.dateTimeLineColor?.map((color, index) => (
            <div key={index} className="size-6 border">
              {color}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
