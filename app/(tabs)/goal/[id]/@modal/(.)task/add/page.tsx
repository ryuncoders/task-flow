"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useItemContext } from "@/contexts/item-context";
import { getTimeLineDateWeekdays, getWeeklyColors } from "@/lib/utils";
import { IDetail, ITask, ITimeLine, IWorkItem } from "@/types/models";
import { useQuery, useQueryClient } from "react-query";
import { fetchWorkItems } from "../../../page";

export default function AddTaskModal() {
  const params = useParams();
  const paramsSearch = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setGridTimeLine } = useItemContext();

  const { data: workItems, isLoading } = useQuery(
    ["workItems", `goalId-${params.id}`],
    () => fetchWorkItems(+params.id!),
    { staleTime: 6 * 10 * 1000 }
  );

  const paramsData = {
    title: paramsSearch.get("title"),
    workItemIndex: paramsSearch.get("workItemIndex"),
    dateStart: paramsSearch.get("dateStart"),
    dateEnd: paramsSearch.get("dateEnd"),
    color: paramsSearch.get("color"),
  };

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState<IDetail[]>([]);
  const timeLineDateWeekdays = getTimeLineDateWeekdays(
    +paramsData.dateStart!,
    +paramsData.dateEnd!
  );
  const initialDetails = timeLineDateWeekdays.map((item) => {
    return { ...item, text: "" };
  });

  const closeModal = () => {
    const re = Array.from(Array(workItems.length), () =>
      Array(7).fill("#ffffff")
    );
    setGridTimeLine(re);
    router.back(); // 모달 닫기 시 이전 URL로 이동
  };

  if (!paramsData) {
    console.log("params에 값이 존재하지 않음.");
    alert("잘못된 형태입니다. 다시 시도해주세요.");
    router.back();
  }

  useEffect(() => {
    setDetails(initialDetails);
  }, []);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const changeDetail = (index: number, text: string) => {
    setDetails((prev) =>
      prev.map((detail, idx) => (idx === index ? { ...detail, text } : detail))
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const workItemId = workItems[+paramsData.workItemIndex!].id;

    try {
      const response = await fetch("/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workItemId,
          title,
          details,
          color: paramsData.color,
        }),
      });

      const result: { success: boolean; timeLineId?: number; error?: string } =
        await response.json();
      const lastInitialDetails = initialDetails.length - 1;

      const dateStart = `${initialDetails[0].year}-${initialDetails[0].month}-${initialDetails[0].day}`;
      const dateEnd = `${initialDetails[lastInitialDetails].year}-${initialDetails[lastInitialDetails].month}-${initialDetails[lastInitialDetails].day}`;

      if (result.success) {
        setTitle("");
        setDetails(initialDetails);
        const newTasks: ITask[] = details.map((detail, index) => ({
          id: index,
          text: detail.text,
          complete: false,
          date: `${detail.year}-${detail.month}-${detail.day}`,
        }));
        const newTimeLine: ITimeLine = {
          id: result.timeLineId!,
          title,
          dateStart: new Date(dateStart),
          dateEnd: new Date(dateEnd),
          tasks: newTasks,
          color: paramsData.color || "#000000",
          dateTimeLineColor: getWeeklyColors({
            dateRange: [dateStart, dateEnd],
            color: paramsData.color ? `#${paramsData.color}` : "#000000", // 기본 색상
          }),
        };
        queryClient.setQueryData<IWorkItem[]>(
          ["workItems", `goalId-${params.id}`], // 쿼리 키 설정
          (
            oldWorkItems = [] // 기존 데이터가 없으면 빈 배열로 설정
          ) =>
            oldWorkItems.map((workItem, index) =>
              index === Number(paramsData.workItemIndex) // 조건에 맞는 아이템 찾기
                ? {
                    ...workItem,
                    timeLines: [...workItem.timeLines, newTimeLine],
                  } // 타임라인 추가
                : workItem
            )
        );

        closeModal();
      } else {
        console.log("응답 받지 못함", result.error);
      }
    } catch (error) {
      console.log("응답 보내기 오류");
    }
  };

  if (isLoading) {
    return <div>task is Loading ...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-lg font-bold">Add Task: {paramsData.title}</h2>
        {/* Task Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={changeTitle}
            placeholder="write the title"
          />
          <div className="border flex gap-3 flex-col p-3">
            {details.map((detail: IDetail, index: number) => (
              <div className="flex flex-col" key={index}>
                <span>
                  {detail.month}-{detail.day}
                </span>
                <input
                  type="text"
                  placeholder="task detail"
                  value={detail.text}
                  onChange={(e) => changeDetail(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
