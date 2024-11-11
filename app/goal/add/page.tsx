"use client";

import { useActionState } from "react";
import { addGoal } from "./actions";

export default function AddGoal() {
  // title, descption, startDate, endDate, period(기간)
  const [state, dispatch] = useActionState(addGoal, null);
  return (
    <div className="flex flex-col max-w-screen-md p-3 gap-2 items-center justify-center h-screen">
      <h1 className="text-center font-bold underline">Add Goal</h1>
      <form
        action={dispatch}
        className="flex flex-col justify-center items-center gap-4 "
      >
        <input type="text" name="title" placeholder="title" required />
        <input
          type="text"
          name="description"
          placeholder="description"
          required
        />
        <input type="date" name="startDate" placeholder="startDate" required />
        <input type="date" name="endDate" placeholder="endDate" required />
        <button
          type="submit"
          className="bg-blue-600 rounded-full text-white w-full p-3"
        >
          add new goal🥳
        </button>
      </form>
    </div>
  );
}
