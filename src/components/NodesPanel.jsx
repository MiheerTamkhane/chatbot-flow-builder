import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Position,
  Controls,
  MarkerType,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { useFlow } from "../context/FlowContext";
import MessageNode from "./Nodes/MessageNode";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "reactflow/dist/style.css";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const nodeTypes = {
  message: MessageNode,
};

const NodesPanel = () => {
  const [savedNodes, setSavedNodes] = useLocalStorage("nodes", []);
  const [savedEdges, setSavedEdges] = useLocalStorage("edges", []);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(savedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    selectedNode,
    setSelectedNode,
    nonTargetedNodes,
    setNonTargetedNodes,
    sources,
    saveChanges,
  } = useFlow();

  const onConnect = useCallback((params) => {
    sources.current = { ...sources.current, [params?.source]: true };

    let updatedNonTargetedNodes = new Set(nonTargetedNodes);
    updatedNonTargetedNodes.delete(params?.target);
    setNonTargetedNodes(updatedNonTargetedNodes);

    setEdges((eds) =>
      addEdge(
        {
          ...params,
          markerEnd: {
            type: MarkerType.Arrow,
          },
        },
        eds
      )
    );
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const id = uuidv4();
      const newNode = {
        id,
        type,
        position,
        data: { label: `test ${type}`, id },
        ...nodeDefaults,
      };
      setNodes((nds) => nds.concat(newNode));
      setNonTargetedNodes(
        (prevValues) => new Set([...prevValues, newNode?.id])
      );
    },
    [reactFlowInstance]
  );

  const handleNodeDelete = useCallback(
    (deletedNodes) => {
      setNodes((nds) =>
        nds.filter((node) => !deletedNodes.some((dn) => dn.id === node.id))
      );
      setEdges(
        deletedNodes.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              markerEnd: {
                type: MarkerType.Arrow,
              },
              source,
              target,
            }))
          );

          if (remainingEdges.length === 0) {
            sources.current = {};
          }
          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  const handleNodeClick = (event, node) => {
    // Deletes the node if ctr + click happend
    if (
      event.type === "contextmenu" ||
      (event.ctrlKey && event.type === "click")
    ) {
      event.preventDefault(); // Prevent the default context menu from appearing
      handleNodeDelete([node]);
      setSelectedNode({});
    } else {
      // select the node.
      setSelectedNode(node);
    }
  };

  const handlePaneClick = () => {
    if (selectedNode?.id) setSelectedNode({});
  };

  // Allow only one connection from source handle
  const isValidConnection = (connection) =>
    !sources.current?.[connection?.source];

  // to update the nodes text
  useEffect(() => {
    setNodes(
      nodes?.map((el) => (el?.id === selectedNode?.id ? selectedNode : el))
    );
  }, [selectedNode]);

  // to save the nodes in localStorage when click on 'Save Chnages" button
  useEffect(() => {
    setSavedNodes(nodes);
    setSavedEdges(edges);
  }, [saveChanges]);

  // Deleting the last node will get remove from localStorage also
  useEffect(() => {
    if (nodes?.length < 1) {
      setSavedNodes([]);
      setSavedEdges([]);
    }
  }, [nodes, edges]);

  return (
    <div className="flex grow flex-col">
      <div className="grow" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          fitView
          className="validationflow"
          isValidConnection={isValidConnection}
        >
          <Background variant="dots" gap={10} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default NodesPanel;
