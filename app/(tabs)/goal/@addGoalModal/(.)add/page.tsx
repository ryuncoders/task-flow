"use client";

import { useActionState } from "react";
import { addGoal } from "../../add/actions";
import { useRouter } from "next/navigation";

export default function AddGoalModal() {
  // title, descption, startDate, endDate, period(기간)
  const [state, dispatch] = useActionState(addGoal, null);
  const router = useRouter();
  const closeModal = () => {
    router.back();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md max-w-md flex flex-col p-6 gap-2 items-center justify-center w-full">
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
          <input
            type="date"
            name="startDate"
            placeholder="startDate"
            required
          />
          <input type="date" name="endDate" placeholder="endDate" required />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
