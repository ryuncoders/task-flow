"use client";

import GoalComponents from "@/components/goal-components";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { addWorkItem } from "./actions";
import { getWeekDateWithWeekdays } from "@/lib/utils";

const paintColor = "#2563eb";

export default function WorkItem({ params }: { params: { id: string } }) {
  const dateAndWeekDays = getWeekDateWithWeekdays();
  return;

  const [weekItem, setWeekItem] = useState(changedWork);

  // 주간 타임라인
  // const { newTimeLine, setNewTimeLine } = useTimeLine();

  useEffect(() => {
    setPrevTimeLine(() =>
      Array.from(Array(changedWork.length), () => Array(7).fill("#ffffff"))
    );
  }, []);
  const [newTimeLine, setNewTimeLine] = useState<string[][]>();

  // drag 동작
  const [isDragging, setIsDragging] = useState(false);
  const [taskDate, setTaskDate] = useState([0, 0]);
  const handleMouseDown = (event: any, index: number, color_index: number) => {
    event.preventDefault();
    setIsDragging(true);
    paintDiv(index, color_index);
    setTaskDate((prev) => [index, prev[1]]);
  };

  const handleMouseEnter = (index: number, color_index: number) => {
    if (isDragging) paintDiv(index, color_index);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    redirect("/task/add");
  };

  const paintDiv = (index: number, color_index: number) => {
    setNewTimeLine((prevTimeLine) => {
      return prevTimeLine!.map((timeLine, idx) => {
        if (idx === index) {
          // 현재 index의 색상 배열만 업데이트
          const newTimeLine = timeLine.map((color, i) =>
            i === color_index ? paintColor : color
          );
          return newTimeLine;
        }
        // 나머지 타임라인은 그대로 유지
        return timeLine;
      });
    });
  };

  // const workItems = await getWorkItem(+params.id!);

  // const [workItem, setWorkItem] = useState<IWorkItem[]>(workList);
  // const [optimisticWorkItem, setOptimisticWorkItem] = useOptimistic(workItem, );
  const onSubmitHandle = async (event: any) => {
    event.preventDefault();

    const newDragLine = Array(7).fill("#ffffff");
    // @ts-ignore
    setNewTimeLine((prev) => [...prev, newDragLine]);
    await addWorkItem(new FormData(event.target), 1);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col gap-3 p-5">
        <GoalComponents
          title={"title"}
          description={"descritpion"}
          period={4}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <form onSubmit={onSubmitHandle} className=" w-[150px]">
            <input type="text" name="title" placeholder="write work item" />
            <button type="submit">Submit</button>
          </form>
          <div className="grid grid-cols-7 w-full">
            {dateAndWeekDays.map((date, index) => (
              <div key={index} className="row-span-1 text-center">
                {date.day}({date.weekdays})
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          {weekItem.map((workItem, idx) => (
            <div className="flex" key={idx}>
              <div className="w-[150px] shrink-0">
                <h1>{workItem.title}</h1>
              </div>
              <div className="w-full relative">
                {workItem.timeLine.map((timeLine, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 w-full absoulte top-0 left-0"
                  >
                    {timeLine.colors.map((color, timeLine_index) => (
                      <div
                        key={timeLine_index}
                        className="row-span-1 text-center border"
                        style={{
                          backgroundColor: color,
                          position: "absolute",
                          left: `${(timeLine_index / 7) * 100}%`,
                          width: `${100 / 7}%`,
                          height: "24px",
                        }}
                      >
                        {color === "#227aff" ? timeLine.title : ""}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col">
            {newTimeLine!.map((newLine, index) => (
              <div
                key={index}
                className="grid grid-cols-7 w-full absoulte top-0 left-0 h-[24px]"
              >
                {newLine.map((color, newLine_index) => (
                  <div
                    key={newLine_index}
                    onMouseDown={(e) =>
                      handleMouseDown(e, index, newLine_index)
                    }
                    onMouseEnter={() => handleMouseEnter(index, newLine_index)}
                    onMouseUp={handleMouseUp}
                    className="row-span-1 border"
                    style={{
                      zIndex: 100,
                      backgroundColor: color,
                      position: "absolute",
                      left: `${(newLine_index / 7) * 100}%`,
                      width: `${100 / 7}%`,
                      height: "24px",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-4">
        <div>
          <h1>isDragging</h1>
          <div>taskDate: {taskDate}</div>
        </div>
      </div>
    </div>
  );
}
