import React from "react";
import toast from "react-hot-toast";
import { useNodes, useEdges } from "reactflow";
import { useFlow } from "../context/FlowContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
const Navbar = () => {
  const nodes = useNodes();
  const edges = useEdges();
  const [, setSavedNodes] = useLocalStorage("nodes");
  const [, setSavedEdges] = useLocalStorage("edges");
  const { nonTargetedNodes, setSaveChanges } = useFlow();
  const handleSaveFlow = () => {
    if (nodes.length === 0) {
      toast.error("At least one node should be added.");
      return;
    }
    if (nonTargetedNodes?.size > 1) {
      toast.error("Cannot save flow.");
      return;
    }
    setSaveChanges((prev) => !prev);
    toast.success("Flow Saved.");
  };
  return (
    <div className="w-full z-50 bg-gray-200 border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <span className="flex flex-shrink-0 items-center font-mono text-3xl tracking-wide font-semibold">
              ChatFlow
            </span>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
            <button
              onClick={handleSaveFlow}
              className="my-2 px-4 py-2 my-sm-0 text-indigo-700 hover:text-gray-700 border rounded-md border-indigo-700 hover:border-gray-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
