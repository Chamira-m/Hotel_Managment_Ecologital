import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FloorManagment from "./pages/FloorManagment";
import SideBar from "./components/SideBar";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <div className="w-1/12">
          <SideBar />
        </div>

        <div className="w-11/12 bg-gray-100">
          <Routes>
            <Route path="/" element={<FloorManagment />} />{" "}
            <Route path="/home" element={<Home />} />{" "}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
