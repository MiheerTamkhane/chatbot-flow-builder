import { createContext, useContext, useRef, useState } from "react";

const FlowContext = createContext(null);

const FlowProvider = ({ children }) => {
  const [selectedNode, setSelectedNode] = useState({});
  const sources = useRef({});
  const [nonTargetedNodes, setNonTargetedNodes] = useState(new Set());
  const [saveChanges, setSaveChanges] = useState(false);

  return (
    <FlowContext.Provider
      value={{
        selectedNode,
        setSelectedNode,
        nonTargetedNodes,
        setNonTargetedNodes,
        sources,
        saveChanges,
        setSaveChanges,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

const useFlow = () => {
  const context = useContext(FlowContext);

  if (context === undefined) {
    throw new Error("Flow context error");
  }
  return context;
};

export { useFlow, FlowProvider };
