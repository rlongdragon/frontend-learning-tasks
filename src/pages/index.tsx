import React, { useState, useEffect } from "react";
import GetSrart from "./GetSrart";
import { useAchievementContext, useAchievementData } from "../lib/data/useAchievementData";

import PAGEDATA from "./info.json";
import TheEnd from "./TheEnd";

interface PageData {
  pages: {
    title: string;
    describe: string | unknown;
    tasks: Task[];
  }[];
}

interface Task {
  name: string;
  describe: string;
  condition: string;
  icon: string;
  difficulty: number; // 0 normal, 1 easy, 2 hard
  hint:
    | {
        title: string;
        describe: string;
      }[]
    | [];
}

function Task({
  task,
  index,
  page,
  isComplete,
  isUnlock
}: {
  task: Task;
  index: number;
  page: number;
  isComplete: boolean;
  isUnlock: boolean;
}) {
  const { setCurrentProgress } = useAchievementContext();
  const colors = [
    ["gray-200", "gray-600"],
    ["blue-200", "blue-600"],
    ["yellow-200", "yellow-600"],
    ["red-200", "red-600"],
    ["purple-200", "purple-600"]
  ];

  const handleCompleteTask = () => {
    setCurrentProgress(`${page}:${index + 1}`);
  };

  return (
    <div className="flex gap-2 p-2 border rounded-lg shadow-md mb-4 bg-white relative">
      {!isUnlock && (
        <div className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-gray-200/20 backdrop-blur-sm rounded-md text-gray-600 text-2xl">
          <i className="fi fi-br-lock"></i>
          <p>完成上一個任務解鎖</p>
        </div>
      )}
      <div className=" flex flex-col w-14 shrink-0">
        <div
          className={`w-14 h-14 flex justify-center items-center bg-${
            colors[task.difficulty][0]
          } rounded-md border-3 border-${colors[task.difficulty][1]} text-${
            colors[task.difficulty][1]
          } text-2xl`}
        >
          {task.icon && <i className={task.icon}></i>}
        </div>
        {isUnlock && !isComplete && (
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition duration-300"
            onClick={handleCompleteTask}
            disabled={!isUnlock}
          >
            完成
          </button>
        )}
      </div>
      <div>
        <h2 className="text-md font-bold">{task.name}</h2>
        <p className="text-gray-700 text-sm">{task.describe}</p>
        <p className="text-gray-500 text-sm">{task.condition}</p>
        {task.hint && (
          <div className="mt-2">
            <h3 className="font-semibold">Hints:</h3>
            {task.hint.map((hint, hintIndex) => (
              <div key={hintIndex}>
                <h4>{hint.title}</h4>
                <p>{hint.describe}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PageN({ page }: { page: number }) {
  const { setCurrentProgress, setCurrentPage } = useAchievementContext();

  const data = PAGEDATA.pages[page - 1];

  const tasks = data.tasks as Task[];

  const { data: achievementData } = useAchievementContext();
  const nowProgress = achievementData.progress;

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-700 mb-4">{data.describe}</p>
      {tasks.map((task, index) => {
        const isUnlock = (()=>{
          if (nowProgress.split(":")[0] === `${page}`) {
            return parseInt(nowProgress.split(":")[1], 10) >= index;
          }
          return true;
        })();
        const isComplete = (()=>{
          if (nowProgress.split(":")[0] === `${page}`) {
            return parseInt(nowProgress.split(":")[1], 10) > index;
          }
          return false;
        })();

        return (
          <Task
            key={index}
            task={task}
            index={index}
            page={page}
            isComplete={isComplete}
            isUnlock={isUnlock}
          />
        );
      })}
      {nowProgress >= `${page}:${tasks.length}` && <div className="flex justify-center items-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={() => 
            {
              const nextPage = page+1;
              if (nextPage <= PAGEDATA.pages.length) {
                setCurrentProgress(`${nextPage}:0`);
                setCurrentPage(nextPage);
              }
            }
          }>
          前往下一章節
        </button>
      </div>}
    </div>
  );
}

function Tab({
  onPageChange,
  unlockedPages
}: {
  onPageChange: (page: number) => void;
  unlockedPages: number;
}) {
  const unlockPage = unlockedPages;

  return (
    <div className="w-full relative mb-4">
      <div className="absolute top-0 left-0 bg-linear-to-r from-white w-2 h-1/1 z-10"></div>
      <div className="absolute top-0 right-0 bg-linear-to-r to-white w-2 h-1/1 z-10"></div>
      <div className="flex overflow-x-aut items-center whitespace-nowrap relative w-full overflow-x-auto">
        {Array.from({ length: unlockPage }, (_, i) => (
          <div
            key={i}
            className="tabButton"
            onClick={() => onPageChange(i + 1)}
          >
            Page {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const pages = [
    <GetSrart />,
    <PageN page={1} />,
    <PageN page={2} />,
    <PageN page={3} />,
    <PageN page={4} />,
    <PageN page={5} />,
    <PageN page={6} />,
    <TheEnd />,
  ];
  const { data, currentPage, setCurrentPage } = useAchievementContext();
  // const {  } = useAchievementData();
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Tab
        onPageChange={handlePageChange}
        unlockedPages={parseInt(data.progress.split(":")[0], 10)}
      />
      {pages[currentPage]}
    </>
  );
}
