"use client";

import { getWeekDateWithWeekdays } from "@/lib/utils";
import { useState } from "react";

const week = [
  {
    index: 0,
    day: 11,
    date: "월",
  },
  {
    index: 1,
    day: 12,
    date: "화",
  },
  { index: 2, day: 13, date: "수" },
  { index: 3, day: 14, date: "목" },
  { index: 4, day: 15, date: "금" },
  { index: 5, day: 16, date: "토" },
  { index: 6, day: 17, date: "일" },
];

export default function DragColoring() {
  // 각 div의 색상을 저장할 배열
  const [colors, setColors] = useState(Array(7).fill("#ffffff"));
  const [isDragging, setIsDragging] = useState(false);
  const [taskDate, setTaskDate] = useState([0, 0]);

  // 색칠할 색상 (필요에 따라 변경 가능)
  const paintColor = "#ffdd57";

  // 마우스를 누르고 있을 때만 색칠하도록 설정
  const handleMouseDown = (event: any, index: number) => {
    event.preventDefault();
    setIsDragging(true);
    paintDiv(index);
    setTaskDate((prev) => [index, prev[1]]);
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging) paintDiv(index);
  };

  const handleMouseUp = (index: number) => {
    setIsDragging(false);
    setTaskDate((prev) => [prev[0], index]);
  };

  const paintDiv = (index: number) => {
    setColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index ? (paintColor === color ? "#ffffff" : paintColor) : color
      )
    );
  };

  const onClick = () => {
    console.log("click button: hello world");
  };

  return (
    <div
    // onMouseUp={handleMouseUp}
    // onMouseLeave={handleMouseUp} // 드래그 중 영역을 벗어나면 드래그 종료
    >
      <div className="flex ">
        {week.map((date, index) => (
          <div key={index} className="px-2">
            {date.day}({date.date})
          </div>
        ))}
      </div>
      <>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              width: "60px",
              height: "50px",
              backgroundColor: color,
              border: "1px solid #000",
              display: "inline-block",
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseUp={() => handleMouseUp(index)}
          ></div>
        ))}
      </>
      <div>
        <h1>isDragging</h1>
        <div>taskDate: {taskDate}</div>
        <span>start Date: {week[Math.min(...taskDate)].day} / </span>
        <span>end Date: {week[Math.max(...taskDate)].day}</span>
      </div>
      <div>
        <h1>test: grid</h1>
        <div className="grid gap-2 grid-cols-[1fr_4fr]">
          <div className="size-16 bg-blue-500 ">1</div>
          <div className="size-16 bg-blue-500 ">2</div>
          <div className="size-16 bg-blue-500 ">
            <div className="">3</div>
            <div className="">3-1</div>
          </div>
          <div className="size-16 bg-blue-500 relative">
            <div className="size-16 bg-blue-300 absolute opacity-50">4-1</div>
            <div className="size-16 bg-blue-300 absolute opacity-50">4-2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
