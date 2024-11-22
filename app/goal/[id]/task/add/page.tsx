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
  const { workItems, setWorkItems } = useItemContext();

  const params = useSearchParams();
  const params_id = useParams().id;

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
    try {
      await fetch("/api/task/create");
    } catch (error) {
      console.log("handle Submit Error");
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
      <h2>workItem: {params.get("work_item")}</h2>
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
