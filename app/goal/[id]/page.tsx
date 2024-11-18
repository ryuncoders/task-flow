"use client";

import { useItemContext } from "@/contexts/item-context";
import { getWeekDateWithWeekdays, getWeeklyColors } from "@/lib/utils";
import { IWorkItem } from "@/types/models";

import { useEffect } from "react";

const test_workItems: IWorkItem[] = [
  {
    id: 1,
    title: "기출풀기",
    timeLines: [
      {
        id: 1,
        title: "1단원",
        tasks: [
          {
            id: 1,
            text: "1회 문제풀이",
            complete: "complete",
            date: "2024-11-19",
          },
          {
            id: 2,
            text: "2회 문제풀이",
            complete: "incomplete",
            date: "2024-11-20",
          },
        ],
        dateRange: ["2024-11-19", "2024-11-21"],
        color: "blue",
        dateTimeLineColor: getWeeklyColors({
          dateRange: ["2024-11-19", "2024-11-21"],
          color: "blue",
        }),
      },
      {
        id: 2,
        title: "2단원",
        tasks: [
          {
            id: 3,
            text: "1회 문제풀이",
            complete: "incomplete",
            date: "2024-11-21",
          },
          {
            id: 4,
            text: "2회 문제풀이",
            complete: "failed",
            date: "2024-11-23",
          },
        ],
        dateRange: ["2024-11-21", "2024-11-23"],
        dateTimeLineColor: getWeeklyColors({
          dateRange: ["2024-11-21", "2024-11-23"],
          color: "tomato",
        }),
        color: "tomato",
      },
    ],
  },
  {
    id: 2,
    title: "영어 단어 암기",
    timeLines: [
      {
        id: 3,
        title: "Day 1",
        tasks: [
          {
            id: 5,
            text: "단어 1~50",
            complete: "complete",
            date: "2024-11-19",
          },
          {
            id: 6,
            text: "단어 복습",
            complete: "complete",
            date: "2024-11-20",
          },
        ],
        dateRange: ["2024-11-19", "2024-11-20"],
        dateTimeLineColor: getWeeklyColors({
          dateRange: ["2024-11-19", "2024-11-20"],
          color: "grey",
        }),
        color: "grey",
      },
      {
        id: 4,
        title: "Day 2",
        tasks: [
          {
            id: 7,
            text: "단어 51~100",
            complete: "incomplete",
            date: "2024-11-21",
          },
        ],
        dateRange: ["2024-11-21", "2024-11-21"],
        dateTimeLineColor: getWeeklyColors({
          dateRange: ["2024-11-21", "2024-11-21"],
          color: "pink",
        }),
        color: "pink",
      },
    ],
  },
];

export default function WorkItem() {
  const { workItems, setWorkItems } = useItemContext();

  useEffect(() => {
    // workItems에서 각 timeLine에 대해 getWeeklyColors를 사용하여 dateTimeLineColor를 설정
    const updatedWorkItems = workItems.map((item) => ({
      ...item,
      timeLines: item.timeLines.map((timeLine) => ({
        ...timeLine,
        dateTimeLineColor: getWeeklyColors({
          dateRange: timeLine.dateRange,
          color: timeLine.color,
        }),
      })),
    }));
    setWorkItems(updatedWorkItems); // 업데이트된 workItems 상태 설정
  }, []); // 컴포넌트 렌더링 후 한번 실행

  setWorkItems(test_workItems);
  const weekDateWidthWeekdays = getWeekDateWithWeekdays();

  return (
    <div className="flex gap-0.5 flex-col mt-10 pl-5">
      {/* form */}
      <div className="flex">
        <div className="w-[200px]" />
        <div className="flex  ">
          {weekDateWidthWeekdays.map((date) => (
            <div className="w-20 flex flex-col text-center ">
              <span className="font-bold">{date.day}</span>
              <span className="text-xs">{date.weekdays}</span>
            </div>
          ))}
        </div>
      </div>

      {workItems.map((workItem) => (
        <div key={workItem.id} className="flex">
          <h1 className=" w-[200px] h-[40px]  ">{workItem.title} </h1>
          <div className="relative ">
            {workItem.timeLines.map((timeLine, idx) => (
              <div className=" flex  absolute ">
                {/* dateTimeLineColor가 null이면 안됨 */}
                {timeLine.dateTimeLineColor!.map((c) => (
                  <div
                    className="h-[40px] w-20 border border-black"
                    style={{
                      backgroundColor: c,
                      opacity: 0.5,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
