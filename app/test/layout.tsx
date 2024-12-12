"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const data = Array.from(Array(8).fill("hi"));

export default function Layout({ children, modal }: LayoutProps) {
  const [isTodoOpen, setTodayTodo] = useState(false);
  const [buttonPositon, setButtonPosition] = useState({ top: 0, right: 0 });
  const modalOpen = () => {
    // modal이 열려야함.
    setTodayTodo(!isTodoOpen);
  };
  return (
    <div className="box-border p-3 h-screen  w-full">
      <div
        className={`grid grid-rows-[1fr_2fr_7fr] transition-all duration-300 flex-grow ${
          isTodoOpen ? "w-3/4" : "w-full"
        }`}
      >
        <nav>
          <ul className="flex gap-2 *:bg-neutral-100 *:rounded-xl *:p-1">
            <li>dashboard</li>
            <li>goal</li>
            <li>calendar</li>
            <li>time</li>
          </ul>
        </nav>
        <header className="text-2xl font-bold mt-6">Hello world✅</header>
        <main
          className={`grid ${
            isTodoOpen ? "grid-cols-3" : "grid-cols-4"
          } h-full gap-1 w-full transition-[grid-template-columns] duration-300 ease-in-out`}
        >
          <AnimatePresence>
            {data.map((d, i) => (
              <motion.div
                key={i}
                layout
                className="bg-slate-500 rounded-xl flex items-center justify-center text-white text-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                {i + 1}
              </motion.div>
            ))}
          </AnimatePresence>
        </main>
        <motion.button
          onClick={modalOpen}
          className="fixed top-4 right-5 rounded-full p-2 bg-blue-500 text-white shadow-md"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          layoutId="todoButton"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </div>

      {/* Todo 화면 */}
      <AnimatePresence>
        {isTodoOpen && (
          <div
            className={`fixed top-0 h-full ${
              isTodoOpen ? "translate-x-0" : "translate-x-full"
            } right-0  transition-transform duration-700 bg-gray-800 text-white p-6 w-1/4`}
          >
            <motion.button
              onClick={() => setTodayTodo(false)}
              className="absoulte top-4 right-4 text-white"
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              layoutId="test"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
            <h2 className="text-xl font-bold mb-4">Todo List</h2>
            {modal}
            <ul className="space-y-2">
              <li>Task 1</li>
              <li>Task 2</li>
              <li>Task 3</li>
            </ul>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
