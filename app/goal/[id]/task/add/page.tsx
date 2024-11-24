"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useItemContext } from "@/contexts/item-context";

const initialDetails = [
  { date: "2024-11-21", text: "" },
  { date: "2024-11-22", text: "" },
  { date: "2024-11-23", text: "" },
];

export default function Task() {
  // 해당하는 워크 아이템 가져오기
  // const { workItems, setWorkItems } = useItemContext();

  const paramsSearch = useSearchParams();
  const paramsId = useParams().id;

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [details, setDetails] =
    useState<{ date: string; text: string }[]>(initialDetails);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const workItemId = paramsSearch.get("work_item_idx");

    const data = {};

    console.log(data);

    try {
      const response = await fetch("/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workItemId, title, details }),
      });

      const result = await response.json();
      if (result.success) {
        setTitle("");
        setDetails(initialDetails);

        console.log("complete!", result.newTask);

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
  };
  const changeDetail = (index: number, text: string) => {
    setDetails((prev) =>
      prev.map((detail, idx) => (idx === index ? { ...detail, text } : detail))
    );
  };
  return (
    <div className="p-5">
      <h1>Task</h1>
      <h2>workItem: {paramsSearch.get("work_item_idx")}</h2>
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
          {details.map((detail: any, index: number) => (
            <div className="flex flex-col" key={index}>
              <span>{detail.date}</span>
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
