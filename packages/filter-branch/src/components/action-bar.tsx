import React from "react";
import { useActions } from "../hooks/use-actions";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { MoveCell, DeleteCell } = useActions();
  return (
    <div className="flex justify-end items-center bg-blue-200">
      <button
        title="Move Up"
        className="w-7 h-7 p-2 text-blue-800 hover:text-blue-700 hover:bg-blue-100"
        onClick={() => MoveCell(id, "up")}
      >
        <svg
          className="fill-current"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_0_2512)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.293 9.707L11 7.414V16H9V7.414L6.707 9.707L5.293 8.293L10 3.586L14.707 8.293L13.293 9.707ZM10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_0_2512">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button
        title="Move Down"
        className="w-7 h-7 p-2 text-blue-800 hover:text-blue-700 hover:bg-blue-100"
        onClick={() => MoveCell(id, "down")}
      >
        <svg
          className="fill-current"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_0_2508)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 16.414L5.293 11.707L6.707 10.293L9 12.586V4H11V12.586L13.293 10.293L14.707 11.707L10 16.414ZM10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_0_2508">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button
        title="Remove"
        className="w-7 h-7 p-2 text-blue-800 hover:text-blue-700 hover:bg-blue-100"
        onClick={() => DeleteCell(id)}
      >
        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="fill-current"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2427 8.99996L16.7787 5.46396C17.1687 5.07396 17.1687 4.44096 16.7787 4.04996L13.9497 1.22196C13.5587 0.830961 12.9267 0.830961 12.5357 1.22196L8.99972 4.75696L5.46472 1.22196C5.07372 0.830961 4.44072 0.830961 4.05072 1.22196L1.22172 4.04996C0.830717 4.44096 0.830717 5.07396 1.22172 5.46396L4.75772 8.99996L1.22172 12.536C0.830717 12.926 0.830717 13.559 1.22172 13.95L4.05072 16.778C4.44072 17.169 5.07372 17.169 5.46472 16.778L8.99972 13.243L12.5357 16.778C12.9267 17.169 13.5587 17.169 13.9497 16.778L16.7787 13.95C17.1687 13.559 17.1687 12.926 16.7787 12.536L13.2427 8.99996Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ActionBar;
