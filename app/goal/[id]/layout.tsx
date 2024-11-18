"use client";

import { ITimeLine, IWorkItem } from "@/app/api/data";
import { TimeLineProvider } from "@/components/context/time-line";
import { getWeeklyColors } from "@/lib/utils";
import { isWithinInterval } from "date-fns";
import React, { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
  params: { id: string };
}

const workItems: IWorkItem[] = [
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
        dateTimeLineColor: null,
      },
      {
        id: 2,
        title: "2단원",
        tasks: [
          {
            id: 3,
            text: "1회 문제풀이",
            complete: "incomplete",
            date: "2024-11-22",
          },
          {
            id: 4,
            text: "2회 문제풀이",
            complete: "failed",
            date: "2024-11-23",
          },
        ],
        dateRange: ["2024-11-22", "2024-11-23"],
        dateTimeLineColor: null,
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
        dateTimeLineColor: null,
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
        dateTimeLineColor: null,
        color: "pink",
      },
    ],
  },
];

export default function GoalLayout({ children, params }: LayoutProps) {
  const [workItem, setWorkItem] = useState<IWorkItem[]>(workItems);
  const [newTimeLine, setNewTimeLIne] = useState<ITimeLine | null>(null);
  const [defaultTimeLine, setDefaultTimeLine] = useState<string[][]>([]);

  useEffect(() => {
    // workItems에서 각 timeLine에 대해 getWeeklyColors를 사용하여 dateTimeLineColor를 설정
    const updatedWorkItems = workItem.map((item) => ({
      ...item,
      timeLines: item.timeLines.map((timeLine) => ({
        ...timeLine,
        dateTimeLineColor: getWeeklyColors({
          dateRange: timeLine.dateRange,
          color: timeLine.color,
        }),
      })),
    }));

    setWorkItem(updatedWorkItems); // 업데이트된 workItems 상태 설정
  }, []); // 컴포넌트 렌더링 후 한번 실행

  return <TimeLineProvider>{children}</TimeLineProvider>;
}
