"use client";

import { useItemContext } from "@/contexts/item-context";
import { getWeekDateWithWeekdays, getWeeklyColors } from "@/lib/utils";
import { IWorkItem } from "@/types/models";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

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

const paintColor = "blue";

const defaultTimeLine = [
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
  ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
];

export default function GoalPage() {
  const { workItems, setWorkItems } = useItemContext();
  const [gridTimeLine, setGridTimeLine] = useState<string[][]>(defaultTimeLine);
  const [errorMessage, setErrorMessage] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchWorkItem = async () => {
      try {
        const goalId = params.id;
        const response = await fetch(`/api/workItem?goalId=${goalId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        if (response.success) {
          return response.workItems;
        } else {
          console.log("응답 받지 못함.", response.error);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("잘못된 goal 입니다.");
      }
    };
    const data = fetchWorkItem();
    setWorkItems(test_workItems);
  }, []); // 컴포넌트 렌더링 후 한번 실행

  const weekDateWidthWeekdays = getWeekDateWithWeekdays();

  const [isDragging, setIsDragging] = useState(false);
  const [newTimeLineIndexAndDate, setNewTimeLineIndexAndDate] = useState([
    0, 0, 0,
  ]);

  const handleMouseDown = (event: any, index: number, color_index: number) => {
    event.preventDefault();
    setIsDragging(true);
    paintDiv(index, color_index);
    setNewTimeLineIndexAndDate((prev) => [index, color_index, prev[2]]);
  };
  const handleMouseEnter = (index: number, color_index: number) => {
    if (isDragging) {
      paintDiv(index, color_index);
      setNewTimeLineIndexAndDate((prev) => [prev[0], prev[1], color_index]);
    }
  };

  const router = useRouter();
  const handleMouseUp = (index: number, color_index: number) => {
    setIsDragging(false);

    const workItemIndex = newTimeLineIndexAndDate[0];
    const dateStart = newTimeLineIndexAndDate[1];
    const dateEnd = newTimeLineIndexAndDate[2];

    console.log(dateStart, dateEnd);

    router.push(
      `/goal/${params.id}/task/add?workItemIndex=${workItemIndex}&dateStart=${dateStart}&dateEnd=${dateEnd}`
    );
  };

  const paintDiv = (index: number, color_index: number) => {
    setGridTimeLine((prevTimeLine) => {
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

  return (
    <div className="flex gap-0.5 flex-col mt-10 pl-5">
      {/* form */}
      <div className="grid grid-cols-[2fr_7fr]">
        <div className="" />
        <div className="flex  ">
          {weekDateWidthWeekdays.map((date, index) => (
            <div className="w-20 flex flex-col text-center " key={index}>
              <span className="font-bold">{date.day}</span>
              <span className="text-xs">{date.weekdays}</span>
            </div>
          ))}
        </div>
      </div>

      {workItems.map((workItem) => (
        <div key={workItem.id} className="grid grid-cols-[2fr_7fr]">
          <h1 className="h-[40px]  ">{workItem.title}</h1>
          <div className="relative ">
            {workItem.timeLines.map((timeLine, idx) => (
              <div className=" flex  absolute   top-0" key={idx}>
                {/* dateTimeLineColor가 null이면 안됨 */}
                {timeLine.dateTimeLineColor!.map((c, color_idx) => (
                  <div
                    key={color_idx}
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

      {gridTimeLine.map((line, index) => (
        <div className="grid grid-cols-[2fr_7fr]" key={index}>
          <div />
          <div
            // onMouseLeave={handleMouseUp(index, color_index)}
            className="flex"
          >
            {[...line].map((color, color_index) => (
              <div
                key={color_index}
                className="border w-20 h-[40px]"
                style={{ backgroundColor: color }}
                onMouseUp={() => handleMouseUp(index, color_index)}
                onMouseDown={(e) => handleMouseDown(e, index, color_index)}
                onMouseEnter={() => handleMouseEnter(index, color_index)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
