import { useEffect, useState } from "react";

import StatCard from "./StatCard";
import { getEmployees } from "../services/employeeService";
import type { Employee } from "../types/employee";
import EmployeeTable from "./EmployeeTable";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import EmployeeForm from "./EmployeeForm";

function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data);
    });
  }, [refreshKey]);

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

      <h2>Welcome to the Employee Management Dashboard</h2>

      <p>Here you can manage employees and departments.</p>

     {!showForm && (
  <button  className="add-employee-button" onClick={() => setShowForm(true)}>
    Add Employee
  </button>
)}

{showForm && (
  <EmployeeForm
    onSuccess={() => {
      setShowForm(false);
      refreshEmployees();
    }}
    onCancel={() => setShowForm(false)}
  />
)}

<section className="stat-cards">
  <StatCard title="Total Employees" value={employees.length} />
  <StatCard title="Departments" value={Departments} />
  <StatCard title="Active Employees" value={activeEmployees} />
  <StatCard title="Inactive Employees" value={inactiveEmployees} />
  </section>
      
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