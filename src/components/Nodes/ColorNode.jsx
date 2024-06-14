import { useState } from "react";
import { Handle, Position, useStore } from "reactflow";
import { useFlow } from "../../context/FlowContext";
const ColorNode = ({ data }) => {
  const { label, id } = data;
  const { selectedNode } = useFlow();
  const [bgColor, setBgColor] = useState("#FF9E9E");

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ height: "7px", width: "7px" }}
      />
      <div
        className={`w-48 bg-white rounded-lg flex flex-col items-center ${
          id === selectedNode?.data?.id ? "shadow-lg" : "shadow-md"
        }`}
        style={{ background: bgColor }}
      >
        <div className="flex gap-2 px-2 py-1 items-center">
          <p className="text-xs font-medium text-gray-700">Color Picker:</p>
          <input
            className="h-6 w-6"
            type="color"
            onChange={(e) => setBgColor(e.target.value)}
            value={bgColor}
          />
        </div>
        <p className="border-t-2 w-full p-2">{label}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ height: "7px", width: "7px" }}
      />
    </>
  );
};

export default ColorNode;
