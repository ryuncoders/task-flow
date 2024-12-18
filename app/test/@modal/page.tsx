"use client";

import { useQueryClient } from "react-query";

export default function Modal() {
  const queryClient = useQueryClient();
  const handleRefresh = () => {
    queryClient.invalidateQueries(["users"]);
  };
  return (
    <div>
      <span>Parallel Routes</span>
      <button className="bg-black text-white p-3" onClick={handleRefresh}>
        Refresh Users
      </button>
    </div>
  );
}
