"use client";

import { getWeekDateWithWeekdays } from "@/lib/utils";
import { ITimeLine } from "@/types/models";
import { endOfWeek, startOfWeek } from "date-fns";
import { Suspense, useEffect, useState } from "react";

interface IAllWorkItem {
  id: number;
  title: string;
  goalId: number;
  createdAt: Date;
  updateAt: Date;
  timeLines: ITimeLine[];
}

export default function HomePage() {
  const [weekWorkItems, setWeekWorkItems] = useState<IAllWorkItem[]>([]);

  useEffect(() => {
    const fetchWorkItem = async () => {
      try {
        const data = await fetch("/api/workItem/week", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
        if (data.success) {
          console.log(data);
          setWeekWorkItems(data.weekWorkItems);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkItem();
  }, []);

  const [show, setShow] = useState(false);
  const onHandleClick = () => {
    setShow((prev) => !prev);
  };

  const getWeekDate = getWeekDateWithWeekdays();
  return (
    <div className="p-5">
      <div className="grid grid-cols-[3fr_8fr]">
        <div>
          <button
            onClick={onHandleClick}
            className="border bg-neutral-400 rounded-3xl"
          >
            {show ? "하나로 보기" : "겹쳐서 보기"}
          </button>
        </div>
        <div className="grid grid-cols-7">
          {getWeekDate.map((date, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <span className="text-lg font-bold">{date.day}</span>
              <span className="text-sm font-thin text-neutral-600">
                {date.weekdays}
              </span>
            </div>
          ))}
        </div>
      </div>

      {weekWorkItems.map((workItem) => (
        <div key={workItem.id} className="grid grid-cols-[3fr_8fr] h-full">
          <span>{workItem.title}</span>
          <div className=" relative w-full">
            <div className="h-full relative">
              {workItem.timeLines.map((timeLine) => (
                <div
                  className={`grid grid-cols-7 h-full ${
                    show ? "absolute top-0 left-0" : "none"
                  }  w-full `}
                >
                  {timeLine.dateTimeLineColor!.map((color, index) => (
                    <div
                      key={`${workItem.id}-${timeLine.id}-${index}`}
                      style={{ backgroundColor: color, opacity: 0.5 }}
                      className="border h-full"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
