"use client";

interface IGoalComponents {
  title: string;
  description: string;
  period: number;
}

export default function GoalComponents({
  title,
  description,
  period,
}: IGoalComponents) {
  return (
    <div className="bg-blue-600 p-5 flex flex-col rounded-3xl text-white">
      <h1 className="font-bold text-xl">{title}</h1>
      <p>{description}</p>
      <span>{period}</span>
    </div>
  );
}
