"use client";

import { useRouter } from "next/navigation";

export default function Test() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/test/profile");
  };
  return (
    <div className="flex flex-col gap-2 p-5">
      <h1>Test page</h1>
      <button
        className="bg-blue-600 text-white p-3 rounded-full"
        onClick={handleButtonClick}
      >
        profile
      </button>
    </div>
  );
}
