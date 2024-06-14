import { useFlow } from "../context/FlowContext";

const UpdateNode = () => {
  const { selectedNode, setSelectedNode } = useFlow();

  const handleInputChange = (event) => {
    setSelectedNode({
      ...selectedNode,
      data: {
        ...selectedNode.data,
        label: event.target.value,
      },
    });
  };
  return (
    <>
      <div className="w-full bg-white flex flex-col">
        <div className="flex items-center p-3 border-b border-gray-300 relative">
          <button
            className="text-gray-600 fixed"
            onClick={() => setSelectedNode({})}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <p className="flex w-full items-center text-lg font-semibold justify-center">
            {selectedNode?.type}
          </p>
        </div>

        <div className="flex-1 p-4">
          <label className="block text-gray-700 mb-2">Text</label>
          <textarea
            className="w-full h-40 p-2 border border-gray-300 rounded-lg"
            value={selectedNode?.data?.label}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default UpdateNode;
