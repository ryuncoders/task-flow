"use client";

import { useActionState } from "react";
import { createAccountHandle } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccountHandle, null);
  return (
    <div className="p-3 flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="font-bold underline">create account</h1>
      <div className="flex">
        <form action={dispatch} className="flex flex-col gap-2">
          <input name="username" type="text" placeholder="username" required />
          <input name="email" type="email" placeholder="email" required />
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
          <input
            name="password2"
            type="password"
            placeholder="password2"
            required
          />
          <button
            className="p-3 mt-3 bg-blue-600 text-white rounded-full"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
