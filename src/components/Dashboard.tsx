import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import StatCard from "./StatCard";
import { getEmployees } from "../services/employeeService";
import type { Employee } from "../types/employee";
import EmployeeTable from "./EmployeeTable";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import EmployeeForm from "./EmployeeForm";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data);
    });
  }, [refreshKey]);

  useEffect(() => {
  if (location.hash === "#employees") {
    const element = document.getElementById("employees");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    return;
  }

  if (location.hash === "#top") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [location.hash, location.pathname, employees]);

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const Departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  const [searchTerm, setSearchTerm] = useState("");  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("Ascending");


  const refreshEmployees = () => {
    setRefreshKey((prev) => prev + 1);
  };

 return (
  <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Welcome to the Employee Management Dashboard</h2>
          <p>Here you can manage employees and departments.</p>
        </div>

       {location.pathname !== "/employees/add" && (
  <button
    className="add-employee-button"
    onClick={() => navigate("/employees/add")}
  >
    Add Employee
  </button>
)}
      </div>

      {location.pathname === "/employees/add" && (
        <div
          className="modal-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              navigate("/employees");
            }
          }}
        >
          <div
            className="add-employee-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-employee-title"
          >
            <h2 id="add-employee-title">Add New Employee</h2>

            <EmployeeForm
              onSuccess={() => {
                navigate("/employees");
                refreshEmployees();
              }}
              onCancel={() => navigate("/employees")}
            />
          </div>
        </div>
      )}

      <section className="stat-cards">
        <StatCard title="Total Employees" value={employees.length} />
        <StatCard title="Departments" value={Departments} />
        <StatCard title="Active Employees" value={activeEmployees} />
        <StatCard title="Inactive Employees" value={inactiveEmployees} />
      </section>
      
      <div className="control-panel">
  <div className="control-panel-header">
    <div>
      <h3>Employee Directory</h3>
      <p>Search and refine the employee list.</p>
    </div>
  </div>

  <div className="search-section">
    <SearchBar
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
    />
  </div>

  <FilterPanel
    department={department}
    onDepartmentChange={setDepartment}
    role={role}
    onRoleChange={setRole}
    status={status}
    onStatusChange={setStatus}
    sortBy={sortBy}
    onSortByChange={setSortBy}
    sortOrder={sortOrder}
    onSortOrderChange={setSortOrder}
  />
</div>

      <EmployeeTable
        key={`${searchTerm}-${department}-${role}-${status}`}
        refreshTrigger={refreshKey}
        searchTerm={searchTerm}
        department={department}
        role={role}
        status={status}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
       </div>
  );
}

export default Dashboard;