"use client";

import { useState } from "react";

export default function Test() {
  const [responseMessage, setResponseMessage] = useState("");
  const handleButtonClick = async () => {
    console.log("click button: hello world");
    const message = "hello world";

    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (result.success) {
        setResponseMessage(result.echo);
      } else {
        console.log("응답 받지 못함.", result.error);
      }
    } catch (error) {
      console.log("응답 못 보냄.", error);
    }
  };

  return (
    <div className="m-5 flex flex-col gap-3">
      <h1>Simple Api Example</h1>
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 rounded-full p-3 text-white"
      >
        Send Message
      </button>
      {responseMessage && <p>Response: {responseMessage}</p>}
    </div>
  );
}
