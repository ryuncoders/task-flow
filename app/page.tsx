import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-between min-h-full p-6 my-auto">
      <h1 className="">Task flow</h1>
      <Link
        href={`/create-account`}
        className="border border-1 bg-blue-600 rounded-full p-2 text-white"
      >
        시작하기
      </Link>
      <div className="flex flex-col items-center mt-10">
        <span>이미 계정이 있나요?</span>
        <Link href={"/login"} className="underline text-blue-800">
          login
        </Link>
      </div>
    </div>
  );
}
