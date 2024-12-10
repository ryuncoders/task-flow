"use client";
import { useEffect, useState } from "react";
import { inherits } from "util";

const employee = [
  {
    workItemTitle: "Designer",
    totalTime: 48,
  },
  {
    workItemTitle: "Developer",
    totalTime: 27,
  },
  {
    workItemTitle: "Project manager",
    totalTime: 18,
  },
];

export default function Widget() {
  useEffect(() => {
    fetch(
      `https://api.unsplash.com/photos/random/?client_id=VU59dDVdMW1ldyLlYB4_2CkfoEJAH4PtzAI9XeaZYgg&count=1&black`
    )
      .then((r) => r.json())
      .then((data) => {
        setImgUrl(data[0].urls.raw);
      });
  }, []);
  const [imgUrl, setImgUrl] = useState("");
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 ">
      <div className="grid grid-rows-[5fr_4fr] *:rounded-3xl gap-2 ">
        <div className="bg-slate-100 relative  overflow-hidden">
          <img
            className="w-full absoulte object-cover top-0 left-0 overflow-hidden"
            style={{ height: "100%" }}
            src={imgUrl}
            alt="Random black tone image from Unsplash"
          />
          <div
            className="absolute left-0 bottom-1 w-full h-24 z-10 rounded-xl flex justify-between items-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            <div className="*:text-white">
              <h4 className="text-lg font-semibold">Chris Janathan</h4>
              <h6 className="text-xs">General manager</h6>
            </div>
            <div className="flex *:rounded-full *:p-2 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 bg-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 bg-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 p-3">
          <div className="">
            <h5 className="text-sm text-neutral-600 ">Average work time</h5>
            <div className="flex justify-between">
              <h3 className="text-2xl">46 hours</h3>
              <span className="flex gap-1 text-green-500 font-semibold text-sm items-center">
                +0.5%
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>표 그리기</div>
          <p className="text-neutral-500 flex gap-1 text-xs items-center absolute bottom-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            Total work hours include extra hours
          </p>
        </div>
      </div>
      <div className="*:bg-slate-100 *:rounded-3xl gap-2 grid grid-rows-[3fr_4fr] grid-cols-2">
        <div className="col-span-2">somthing todo ....</div>
        <div className="p-4 relative w-full box-border">
          <div className="">
            <div>
              <h5>Total employee</h5>
              <h6>Track your team</h6>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="box-border w-full">
            <div>저 모양 어케 만드냐...</div>
            <div className="flex flex-col w-full  gap-2 justify-center absolute bottom-4">
              {employee.map((data, index) => (
                <div className="flex justify-between ">
                  <span className="flex gap-2 items-center">
                    <div className="bg-teal-600 size-4 rounded-md" />
                    {data.workItemTitle}
                  </span>
                  <span>{data.totalTime} hours</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>3</div>
      </div>
    </div>
  );
}
