import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import EmployeeDetails from "./components/EmployeeDetails";
import EditEmployee from "./components/EditEmployee";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
      <Header />

     <div className={`app-layout ${sidebarOpen ? "sidebar-open" : ""}`}>
  <Sidebar
    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
    isOpen={sidebarOpen}
  />

  <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/employees" element={<Dashboard />} />
  <Route path="/employees/add" element={<Dashboard />} />
  <Route path="/employees/:id" element={<EmployeeDetails />} />
  <Route path="/employees/:id/edit" element={<EditEmployee />} />
</Routes>
</div>
      </div>
    </BrowserRouter>
  );
}

export default App;