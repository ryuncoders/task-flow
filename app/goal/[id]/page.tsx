"use client";

import { useItemContext } from "@/contexts/item-context";
import {
  convertToRGBA,
  getWeekDateWithWeekdays,
  getWeeklyColors,
} from "@/lib/utils";
import { IWorkItem } from "@/types/models";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const paintColor = "black";

const defaultTimeLine = Array.from(Array(3), () => Array(7).fill("#ffffff"));

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
          setWorkItems(response.updatedWorkItems);
        } else {
          console.log("응답 받지 못함.", response.error);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("잘못된 goal 입니다.");
      }
    };
    fetchWorkItem();
  }, [params.id]); // 컴포넌트 렌더링 후 한번 실행

  useEffect(() => {
    if (workItems.length > 0) {
      setGridTimeLine(
        Array.from(Array(workItems.length), () => Array(7).fill("#ffffff"))
      );
    }
  }, [workItems]);

  const weekDateWidthWeekdays = getWeekDateWithWeekdays();

  const [isDragging, setIsDragging] = useState(false);
  const [newTimeLineIndexAndDate, setNewTimeLineIndexAndDate] = useState([
    0, 0, 0,
  ]);

  const handleMouseDown = (event: any, index: number, color_index: number) => {
    event.preventDefault();
    setIsDragging(true);
    paintDiv(index, color_index);
    setNewTimeLineIndexAndDate((prev) => [index, color_index, color_index]);
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

    const [workItemIndex, ...date] = newTimeLineIndexAndDate;

    const dateStart = Math.min(...date);
    const dateEnd = Math.max(...date);

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

      {workItems.map((workItem, workItem_index) => (
        <div key={workItem.id} className="grid grid-cols-[2fr_7fr] relative">
          <h1 className="h-[40px]  ">{workItem.title}</h1>
          <div className="relative ">
            {/* gridTimeLine */}
            <div className="absoulte flex top-0 left-0">
              {gridTimeLine[workItem_index].map((color, index) => (
                <div className="border border-black h-[40px] w-20 " key={index}>
                  <div
                    className="opacity-50 w-[100%] h-[100%] z-10"
                    style={{
                      backgroundColor: color,
                    }}
                    onMouseUp={() => handleMouseUp(workItem_index, index)}
                    onMouseDown={(e) =>
                      handleMouseDown(e, workItem_index, index)
                    }
                    onMouseEnter={() => handleMouseEnter(workItem_index, index)}
                  />
                </div>
              ))}
            </div>
            {workItem.timeLines.map((timeLine, index) => (
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
          </div>
        </div>
      ))}
    </div>
  );
}
