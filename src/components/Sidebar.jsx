import React from "react";
import { useFlow } from "../context/FlowContext";
import UpdateNode from "./UpdateNode";
import DraggableCard from "./DraggableCard";
import SquareMessage from "../assets/square-message.svg";
import ColorPalatte from "../assets/colors.svg";
import toast from "react-hot-toast";
const Sidebar = () => {
  const { selectedNode } = useFlow();
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className=" bg-slate-50 w-96 border-l-4">
      <div className="w-full">
        {Object.keys(selectedNode).length > 0 ? (
          <UpdateNode />
        ) : (
          <div className="flex gap-3 my-3 mx-2 justify-start flex-wrap pl-4">
            <DraggableCard
              type="message"
              img={SquareMessage}
              label="Message"
              onDragStart={onDragStart}
              className="text-blue-500 border-blue-300"
            />
            <DraggableCard
              type="color"
              img={ColorPalatte}
              label="Color Node"
              onDragStart={() => toast.error("Cant use still in progress.")}
              className="text-red-500 border-red-300"
            />
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
