"use client";

import { useState } from "react";

export default function ResizableGridWithMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* 기본 화면 */}
      <div
        className={`transition-all duration-300 grid ${
          isMenuOpen ? "grid-cols-3" : "grid-cols-4"
        } gap-2 flex-1`}
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white flex items-center justify-center rounded-lg"
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* 메뉴 화면 */}
      <div
        className={`bg-gray-800 text-white p-6 transition-transform duration-300 ${
          isMenuOpen ? "w-64" : "w-0"
        }`}
      >
        <button
          className="absolute top-4 left-[-50px] bg-blue-500 text-white p-2 rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "Close" : "Open"}
        </button>
        {isMenuOpen && (
          <div className="h-full flex flex-col">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
