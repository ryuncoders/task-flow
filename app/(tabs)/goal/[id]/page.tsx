"use client";

import { useItemContext } from "@/contexts/item-context";
import { getWeekDateWithWeekdays } from "@/lib/utils";
import { IWorkItem } from "@/types/models";
import { WorkItem } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const colorPattle = [
  "#7f8c8d",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f39c12",
  "#d35400",
  "#c0392b",
];

export async function fetchWorkItems(goalId: number) {
  const response = await fetch(`/api/workItem/${goalId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  if (response.success) {
    return response.updatedWorkItems;
  } else {
    console.error("fetch workItem api 오류 발생");
  }
}

export default function GoalPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: workItems = [], isLoading } = useQuery<IWorkItem[]>(
    ["workItems", `goalId-${params.id}`],
    () => fetchWorkItems(+params.id!),
    { staleTime: 6 * 10 * 1000 }
  );
  const weekDateWidthWeekdays = getWeekDateWithWeekdays();
  const { gridTimeLine, setGridTimeLine } = useItemContext();
  const [colorSelect, setColorSelect] = useState(colorPattle[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [newTimeLineIndexAndDate, setNewTimeLineIndexAndDate] = useState([
    0, 0, 0,
  ]);

  useEffect(() => {
    if (workItems.length > 0) {
      setGridTimeLine(
        Array.from(Array(workItems?.length), () => Array(7).fill("#ffffff"))
      );
    }
  }, [workItems]);

  const [workItemTitle, setWorkItemTitle] = useState("");
  const handleWorkItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkItemTitle(event.target.value);
  };

  const handleMouseDown = (event: any, index: number, color_index: number) => {
    event.preventDefault();
    setIsDragging(true);
    paintDiv(index, color_index);
    setNewTimeLineIndexAndDate(() => [index, color_index, color_index]);
  };
  const handleMouseEnter = (index: number, color_index: number) => {
    if (isDragging) {
      paintDiv(index, color_index);
      setNewTimeLineIndexAndDate((prev) => [prev[0], prev[1], color_index]);
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);

    const [workItemIndex, ...date] = newTimeLineIndexAndDate;

    const dateStart = Math.min(...date);
    const dateEnd = Math.max(...date);

    router.push(
      `/goal/${params.id}/task/add?title=${
        workItems[workItemIndex].title
      }&workItemIndex=${workItemIndex}&dateStart=${dateStart}&dateEnd=${dateEnd}&color=${colorSelect.slice(
        1
      )}`
    );
  };
  const paintDiv = (index: number, color_index: number) => {
    setGridTimeLine((prevTimeLine) => {
      return prevTimeLine?.map((timeLine, idx) => {
        if (idx === index) {
          // 현재 index의 색상 배열만 업데이트
          const newTimeLine = timeLine.map((color, i) =>
            i === color_index ? colorSelect : color
          );
          return newTimeLine;
        }
        // 나머지 타임라인은 그대로 유지
        return timeLine;
      });
    });
  };

  const handleWorkItemSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/workItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: workItemTitle,
          goalId: params.id,
        }),
      }).then((res) => res.json());

      if (response.success) {
        const newWorkItem = {
          id: response.workItemId,
          title: workItemTitle,
          timeLines: [],
        };

        queryClient.setQueryData<IWorkItem[]>(
          ["workItems", `goalId-${params.id}`],
          (oldWorkItems = []) => [...oldWorkItems, newWorkItem]
        );
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log("응답오류", error);
    }
    setWorkItemTitle("");
  };

  if (isLoading) {
    return <div>is timeLine Loading ... 😊</div>;
  }

  return (
    <div className="flex gap-0.5 flex-col mt-10 pl-5">
      <div>
        <form onSubmit={handleWorkItemSubmit}>
          <input
            onChange={handleWorkItemChange}
            value={workItemTitle}
            type="text"
            placeholder="write the work todo..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-2 py-1 rounded-lg"
          >
            submit
          </button>
        </form>
      </div>
      <div className="flex gap-1">
        {colorPattle.map((color) => (
          <div
            key={color}
            className="size-4 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => setColorSelect(color)}
          />
        ))}
      </div>
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

      {workItems.map((workItem, workItem_index) => (
        <div key={workItem.id} className="grid grid-cols-[2fr_7fr] relative">
          <h1 className="h-[40px]  ">{workItem.title}</h1>
          <div className="relative ">
            {/* gridTimeLine */}

            {workItem.timeLines?.map((timeLine, index) => (
              <div className=" flex  absolute   top-0 left-0" key={index}>
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

            <div className="absoulte flex top-0 left-0">
              {gridTimeLine?.[workItem_index]?.map((color, index) => (
                <div className="border border-black h-[40px] w-20 " key={index}>
                  <div
                    className="opacity-50 w-[100%] h-[100%] z-10"
                    style={{
                      backgroundColor: color,
                    }}
                    onMouseUp={() => handleMouseUp()}
                    onMouseDown={(e) =>
                      handleMouseDown(e, workItem_index, index)
                    }
                    onMouseEnter={() => handleMouseEnter(workItem_index, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
