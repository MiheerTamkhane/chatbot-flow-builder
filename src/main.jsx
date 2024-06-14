import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";
import { FlowProvider } from "./context/FlowContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FlowProvider>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </FlowProvider>
  </React.StrictMode>
);
