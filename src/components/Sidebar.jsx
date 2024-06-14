import React from "react";
import { useFlow } from "../context/FlowContext";
import UpdateNode from "./UpdateNode";
const Sidebar = () => {
  const { selectedNode } = useFlow();
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="bg-white w-80">
      <div className="w-full">
        {Object.keys(selectedNode).length > 0 ? (
          <UpdateNode />
        ) : (
          <div className="flex gap-3 my-3 mx-2 justify-start flex-wrap">
            <div
              className="border border-blue-300 rounded-lg p-4 flex flex-col items-center cursor-grab"
              onDragStart={(event) => onDragStart(event, "message")}
              draggable
            >
              <svg
                width="10px"
                height="10px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-500 mb-2"
              >
                <path
                  d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 9.5H17"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 14.5H14"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-blue-500">Message</span>
            </div>

            <div
              className="border border-blue-300 rounded-lg p-4 flex flex-col items-center cursor-grab"
              onDragStart={(event) => onDragStart(event, "message")}
              draggable
            >
              <svg
                width="10px"
                height="10px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-500 mb-2"
              >
                <path
                  d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 9.5H17"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 14.5H14"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-blue-500">Message</span>
            </div>

            <div
              className="border border-blue-300 rounded-lg p-4 flex flex-col items-center cursor-grab"
              onDragStart={(event) => onDragStart(event, "message")}
              draggable
            >
              <svg
                width="10px"
                height="10px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-500 mb-2"
              >
                <path
                  d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 9.5H17"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 14.5H14"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-blue-500">Message</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
