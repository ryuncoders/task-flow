"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useItemContext } from "@/contexts/item-context";
import { getTimeLineDateWeekdays } from "@/lib/utils";

interface IDetail {
  year: string;
  weekdays: string;
  month: string;
  day: string;
  text: string;
}

export default function Task() {
  const { workItems } = useItemContext();
  const paramsSearch = useSearchParams();
  const paramsId = useParams().id;
  const router = useRouter();

  const paramsData = {
    workItemIndex: paramsSearch.get("workItemIndex"),
    dateStart: paramsSearch.get("dateStart"),
    dateEnd: paramsSearch.get("dateEnd"),
  };

  if (!paramsData) {
    console.log("params에 값이 존재하지 않음.");
    alert("잘못된 형태입니다. 다시 시도해주세요.");
    router.back();
  }
  const timeLineDateWeekdays = getTimeLineDateWeekdays(
    +paramsData.dateStart!,
    +paramsData.dateEnd!
  );

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState<IDetail[]>([]);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const initialDetails = timeLineDateWeekdays.map((item) => {
    return { ...item, text: "" };
  });

  useEffect(() => {
    setDetails(initialDetails);
  }, []);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
        }),
      });

      const result = await response.json();
      if (result.success) {
        setTitle("");
        setDetails(initialDetails);
        router.push(`/goal/${paramsId}`);
      } else {
        console.log("응답 받지 못함", result.error);
      }
    } catch (error) {
      console.log("응답 보내기 오류");
    }
  };

  const handleCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle("");
    setDetails(initialDetails);
    setSubmittedData(null);
    router.back();
  };

  const changeDetail = (index: number, text: string) => {
    setDetails((prev) =>
      prev.map((detail, idx) => (idx === index ? { ...detail, text } : detail))
    );
  };

  return (
    <div className="p-5">
      <h1>Task</h1>
      <Suspense fallback={"hello world"}>
        <h2>workItem: {workItems[+paramsData.workItemIndex!].title}</h2>
      </Suspense>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="gap-1 flex justify-end">
          <button className="rounded-md bg-blue-600 px-2 py-1" type="submit">
            확인
          </button>
          <button
            onClick={handleCancel}
            className=" rounded-md bg-blue-600 px-2 py-1"
            type="button"
          >
            취소
          </button>
        </div>
        <div>
          <label htmlFor="title" className="pr-2">
            title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={changeTitle}
            placeholder="write the title"
          />
        </div>
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
      </form>
    </div>
  );
}
