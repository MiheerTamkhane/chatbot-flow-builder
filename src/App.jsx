import { Toaster } from "react-hot-toast";
import NodesPanel from "./components/NodesPanel";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 2000,
        }}
      />
      <div className="w-full h-screen bg-slate-100 flex flex-col">
        <Navbar />
        <div className="flex gap-2 h-full">
          <NodesPanel />
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default App;
