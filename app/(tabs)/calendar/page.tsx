"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 적용

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Tailwind Styled Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="bg-gray-50 rounded-lg shadow-md p-4" // 캘린더 외부 컨테이너 스타일
        tileClassName={({ date, view }) =>
          "p-2 text-center rounded-md hover:bg-blue-100" +
          (selectedDate?.toDateString() === date.toDateString()
            ? " bg-blue-500 text-white"
            : "")
        } // 각 날짜 타일에 Tailwind 클래스 적용
      />
      {selectedDate && (
        <p className="mt-4 text-lg">
          선택된 날짜:{" "}
          <span className="font-semibold">
            {selectedDate.toLocaleDateString()}
          </span>
        </p>
      )}
    </div>
  );
}
