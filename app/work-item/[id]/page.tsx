"use client";

import { getWorkItem } from "@/app/api/data";
import GoalComponents from "@/components/goal-components";
import WorkList from "@/components/work-item/work-list";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addWorkItem } from "./actions";
import { getWeekDateWithWeekdays } from "@/lib/utils";

const workList = [{ id: 1, title: "hello world" }];

const defaultColor = "#ffffff";
const paintColor = "#2563eb";

interface IWorkItem {
  title: string;
}

export default function WorkItem({ params }: { params: { id: string } }) {
  const dateAndWeekDays = getWeekDateWithWeekdays();

  const [workItem, setWorkItem] = useState<IWorkItem[]>([]);

  // 주간 타임라인
  const [allTimeLine, setAllTimeLine] = useState<string[][]>([]);

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
  };

  const paintDiv = (index: number, color_index: number) => {
    setAllTimeLine((prevTimeLine) => {
      return prevTimeLine.map((timeLine, idx) => {
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

  useEffect(() => {
    console.log(allTimeLine);
  }, [allTimeLine]);
  // const workItems = await getWorkItem(+params.id!);

  // const [workItem, setWorkItem] = useState<IWorkItem[]>(workList);
  // const [optimisticWorkItem, setOptimisticWorkItem] = useOptimistic(workItem, );
  const onSubmitHandle = async (event: any) => {
    event.preventDefault();

    const newDragLine = Array(7).fill("#ffffff");
    // @ts-ignore
    setAllTimeLine((prev) => [...prev, newDragLine]);

    setWorkItem((prev) => [...prev, { title: event.target[0].value }]);
    // await addWorkItem(new FormData(event.target), 1);
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
      <div className="flex auto-rows-auto-[100px]">
        <div className="flex flex-col">
          {/* submit : ok!*/}
          <form onSubmit={onSubmitHandle} className="col-span-3 min-w-60">
            <input type="text" name="title" placeholder="write work item" />
            <button type="submit">Submit</button>
          </form>
          <div className="col-span-3  min-w-60">
            {workItem.map((item, index) => (
              <div key={index}>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          {/* date : ok!*/}
          <div className="grid grid-cols-7">
            {dateAndWeekDays.map((date, index) => (
              <div key={index} className="row-span-1 text-center">
                {date.day}({date.weekdays})
              </div>
            ))}
          </div>
          <div
            className=""
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {allTimeLine.map((line, index) => (
              <div
                className="grid grid-cols-7"
                key={index}
                onMouseLeave={handleMouseUp}
              >
                {[...line].map((color, color_index) => (
                  <div
                    key={color_index}
                    className="row-span-1 border h-6"
                    style={{ backgroundColor: color }}
                    onMouseDown={(e) => handleMouseDown(e, index, color_index)}
                    onMouseEnter={() => handleMouseEnter(index, color_index)}
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
