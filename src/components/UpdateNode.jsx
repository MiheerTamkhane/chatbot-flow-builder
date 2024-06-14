import { useFlow } from "../context/FlowContext";
import LeftArrow from "../assets/left-arrow.svg";

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
            <img src={LeftArrow} alt="left-arrow" />
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
