"use client";

import { login } from "./actions";
import { useActionState } from "react";

export default function Login() {
  const [state, dispatch] = useActionState(login, null);
  return (
    <div className="flex flex-col justify-center items-center gap-3 max-w-screen-md h-screen">
      <h1 className="font-bold">Login</h1>
      <span>{state}</span>
      <form action={dispatch} className="flex flex-col gap-2">
        <input type="text" placeholder="email" required name="email" />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
        />
        <button type="submit" className="bg-blue-600 p-3 rounded-full">
          Login
        </button>
      </form>
    </div>
  );
}
