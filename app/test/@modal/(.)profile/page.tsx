"use client";

import { useRouter } from "next/navigation";

export default function Modal() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <div className="absolute w-full h-screen top-0 left-0 size-96 flex items-center justify-center">
      <div className="flex-col flex bg-blue-300 w-80 h-40 p-5">
        <h1>modal page</h1>
        <p>만약 이페이지를 본다면 너는 성공한 것임.</p>
        <button
          onClick={handleClick}
          className="size-6 rounded-full bg-black text-white flex justify-center items-center"
        >
          x
        </button>
      </div>
    </div>
  );
}
