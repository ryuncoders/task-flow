"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export interface ITask {
  id: number;
  date: Date;
  text: string;
  isComplete: boolean;
  createdAt: Date;
  updateAt: Date;
  timeLineId: number;
  timeLine: {
    workItem: {
      title: string;
      goal: {
        title: string;
      };
    };
  };
}

async function fetchTodayTask() {
  const response = await fetch("/api/task/get").then((res) => res.json());
  if (response.success) {
    const newSortedTasks = [...response.tasks].sort((a, b) => {
      if (a.isComplete === b.isComplete) return 0;
      return a.isComplete ? 1 : -1;
    });
    return newSortedTasks;
  } else {
    console.error("fetch error: get today task");
  }
}

export default function Default() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery(["todayTask"], fetchTodayTask, {
    staleTime: 6 * 10 * 1000,
  });

  const [updateTask, setUpdateTask] = useState([0, false]);
  const taskClickHandle = (taskId: number, isComplete: boolean) => {
    setUpdateTask([taskId, isComplete]);

    queryClient.setQueryData(["todayTask"], (oldData: ITask[] | undefined) => {
      if (!oldData) return [];

      const updatedTasks = oldData.map((task) =>
        task.id === taskId ? { ...task, isComplete } : task
      );

      return updatedTasks.sort((a, b) => {
        if (a.isComplete === b.isComplete) return 0;
        return a.isComplete ? 1 : -1;
      });
    });
  };

  useEffect(() => {
    const updateTasks = async () => {
      try {
        const response = await fetch("/api/task/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: updateTask[0],
            isComplete: updateTask[1],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update task");
        }
      } catch (error) {
        console.error("Error: updating task", error);
        // 실패 시 원래 상태로 복구

        queryClient.setQueryData(
          ["todayTask"],
          (oldData: ITask[] | undefined) => {
            if (!oldData) return [];
            return oldData.map((task) =>
              task.id === updateTask[0] ? { ...task, isComplete: false } : task
            );
          }
        );
      }
    };

    updateTasks();
  }, [updateTask]);

  const today = new Date().toString().split(" ");

  if (isLoading) {
    return <div>today task is Loading ...</div>;
  }

  return (
    <div className="p-4 grid grid-rows-[1fr_0.5fr_5fr_3fr] w-full">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Todo List</h1>

        <Link href={"/edit"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1 text-neutral-600">{`${today[1]} ${today[2]}`}</h4>
        <hr />
      </div>
      <Suspense>
        <ul className="space-y-2 mt-2 w-full">
          {tasks?.map((task) => (
            <li
              key={task.id}
              className="flex w-full items-center justify-between py-2 px-4 rounded-3xl bg-neutral-200"
            >
              <div className="flex flex-col">
                <span className={`${task.isComplete ? "line-through" : ""}`}>
                  {task.text}
                </span>
                <div className="items-center flex gap-1 *:text-neutral-500 ">
                  <strong className="text-xs ">
                    {task.timeLine.workItem.goal.title}
                  </strong>
                  <span>·</span>
                  <span className="text-xs">
                    {task.timeLine.workItem.title}
                  </span>
                </div>
              </div>
              <div
                onClick={() =>
                  taskClickHandle(task.id, task.isComplete ? false : true)
                }
                className="cursor-pointer  p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-6 rounded-full hover:text-blue-300 ${
                    task.isComplete ? "bg-blue-500" : "bg-white"
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
