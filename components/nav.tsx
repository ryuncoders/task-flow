import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex gap-8 fixed top-0 left-0 bg-white p-3">
      <div className="rounded-full bg-blue-600 p-2 size-8 flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
          color="white"
        >
          <path
            fillRule="evenodd"
            d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <ul className="flex gap-2 *:text-neutral-600 *:font-medium *:bg-neutral-100 *:rounded-full *:flex *:items-center *:justify-center  *:px-3 *:text-sm">
        <li>
          <Link href="/home">Dashboard</Link>
        </li>
        <li>
          <Link href="/calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/goal">Goal</Link>
        </li>
        <li>
          <Link href="/time">Time</Link>
        </li>
      </ul>
    </nav>
  );
}
