"use client";

import { POST } from "@/app/api/test/route";
import { set } from "date-fns";
import { Suspense, useEffect, useState } from "react";

export interface ITask {
  id: number;
  date: Date;
  text: string;
  isComplete: string;
  createdAt: Date;
  updateAt: Date;
  timeLineId: number;
}

export default function Default() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [updateTaskId, setUpdateTaskId] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/task/get").then((res) => res.json());
        if (response.success) {
          setTasks(response.tasks);
        }
      } catch (error) {
        console.log("error 남");
      }
    };
    fetchTasks();
  }, []);

  const taskClickHandle = (taskId: number) => {
    setUpdateTaskId(taskId);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isComplete:
                task.isComplete === "complete" ? "incomplete" : "complete",
            }
          : task
      )
    );
  };

  useEffect(() => {
    const updateTasks = async () => {
      try {
        const response = await fetch("/api/task/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId: updateTaskId }),
        });
        if (!response.ok) {
          throw new Error("Failed to update task");
        }
      } catch (error) {
        console.error("Error: updating task", error);
        // 실패 시 원래 상태로 복구
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updateTaskId
              ? {
                  ...task,
                  isComplete:
                    task.isComplete === "complete" ? "complete" : "incomplete",
                }
              : task
          )
        );
      }
    };

    updateTasks();
  }, [updateTaskId]);

  return (
    <div className="p-4 grid grid-rows-[1fr_5fr_3fr] w-full">
      <h1 className="text-lg font-bold">Todo List</h1>
      <Suspense>
        <ul className="space-y-2 mt-2 w-full">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex w-full items-center justify-between py-2 px-4 rounded-3xl bg-neutral-200"
            >
              <span>{task.text}</span>
              <div
                onClick={() => taskClickHandle(task.id)}
                className="cursor-pointer  p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 rounded-full hover:text-blue-300 ${
                    task.isComplete === "complete" ? "bg-blue-500" : "bg-white"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}
