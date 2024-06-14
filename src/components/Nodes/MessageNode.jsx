import { Handle, Position } from "reactflow";
import Message from "../../assets/message.svg";
import WhatsappLogo from "../../assets/whatsapp-logo.svg";
import { useFlow } from "../../context/FlowContext";

const MessageNode = ({ data }) => {
  const { label, id } = data;
  const { selectedNode } = useFlow();

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ height: "7px", width: "7px" }}
      />
      <div
        className={`w-48 bg-teal-100 rounded-lg ${
          id === selectedNode?.data?.id ? "shadow-lg" : "shadow-md"
        }`}
      >
        <div className="bg-teal-200 flex items-center justify-between rounded-t-lg px-2">
          <div className="p-1 text-green-500 flex gap-1 items-center">
            <img src={Message} alt="message-logo" />
            <p className="text-xs font-medium text-gray-700">Send Message</p>
          </div>
          <div>
            <img src={WhatsappLogo} alt="logo" />
          </div>
        </div>
        <div className="bg-white p-2 rounded-b-lg break-words">
          <span className="text-sm">{label}</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ height: "7px", width: "7px" }}
      />
    </>
  );
};

export default MessageNode;
