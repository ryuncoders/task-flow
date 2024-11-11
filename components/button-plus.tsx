import Link from "next/link";

export default function PlusButton({ url }: { url: string }) {
  return (
    <Link
      href={url}
      className="border border-#bdc3c7 rounded-full p-3 fixed bottom-10 right-10"
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8"
        color="#7f8c8d"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </Link>
  );
}
