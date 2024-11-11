"use client";

import { useState } from "react";

export default function DragColoring() {
  // 각 div의 색상을 저장할 배열
  const [colors, setColors] = useState(Array(7).fill("#ffffff"));
  const [isDragging, setIsDragging] = useState(false);

  // 색칠할 색상 (필요에 따라 변경 가능)
  const paintColor = "#ffdd57";

  // 마우스를 누르고 있을 때만 색칠하도록 설정
  const handleMouseDown = (event: any, index: number) => {
    event.preventDefault();
    setIsDragging(true);
    paintDiv(index);
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging) paintDiv(index);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const paintDiv = (index: number) => {
    setColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index ? (paintColor === color ? "#ffffff" : paintColor) : color
      )
    );
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // 드래그 중 영역을 벗어나면 드래그 종료
    >
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: color,
            border: "1px solid #000",
            display: "inline-block",
          }}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onMouseEnter={() => handleMouseEnter(index)}
        ></div>
      ))}
    </div>
  );
}
