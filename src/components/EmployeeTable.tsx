import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Employee } from "../types/employee";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import DeleteConfirmation from "./DeleteConfirmation";


interface EmployeeTableProps {
  refreshTrigger: number;
  searchTerm: string;
  department: string;
  role: string;
  status: string;
  sortBy: string;
  sortOrder: string;
}

function EmployeeTable({
  refreshTrigger,
  searchTerm,
  department,
  role,
  status,
  sortBy,
  sortOrder,
}: EmployeeTableProps) {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const employeesPerPage = 10;

 useEffect(() => {
  getEmployees().then((data) => {
    setEmployees(data);
    setLoading(false);
  });
}, [refreshTrigger]);

  if (loading) {
  return <p>Loading employees...</p>;
}

const filteredEmployees = employees.filter((employee) => {
const search = searchTerm.toLowerCase().replace(/\s/g, "");
const fullName = `${employee.firstName} ${employee.lastName}`
  .toLowerCase()
  .replace(/\s/g, "");

  return (
  (
    fullName.includes(search) ||
    employee.id.toLowerCase().includes(search) ||
    employee.email.toLowerCase().includes(search)
  ) &&
 (department === "" || employee.department === department) &&
 (role === "" || employee.role === role) &&
 (status === "" || employee.status === status)
);
});

const sortedEmployees = [...filteredEmployees].sort((a, b) => {
  if (sortBy === "") {
    return 0;
  }

  let valueA = "";
  let valueB = "";

  if (sortBy === "name") {
    valueA = `${a.firstName} ${a.lastName}`;
    valueB = `${b.firstName} ${b.lastName}`;
  }

  if (sortBy === "joiningDate") {
    valueA = a.joiningDate;
    valueB = b.joiningDate;
  }

  if (sortBy === "department") {
    valueA = a.department;
    valueB = b.department;
  }

  if (sortBy === "status") {
    valueA = a.status;
    valueB = b.status;
  }

  const comparison = valueA.localeCompare(valueB);

  return sortOrder === "Ascending"
    ? comparison
    : -comparison;
});

const startIndex = (currentPage - 1) * employeesPerPage;

const currentEmployees = sortedEmployees.slice(
  startIndex,
  startIndex + employeesPerPage
);

const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
   <>
   <section id="employees" className="employee-table">
      <h2>EMPLOYEE DETAILS</h2>

      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((employee) => (
            <tr key={employee.id}>
             <td>
  <div className="employee-info">
    <span className="employee-name">
      {employee.firstName} {employee.lastName}
    </span>
    <span className="employee-id">
      {employee.id}
    </span>
  </div>
</td>
              <td>{employee.department}</td>
              <td>{employee.role}</td>
             <td>
              <span className={`table-status ${employee.status.toLowerCase()}`}>
                {employee.status}
                </span>
                </td>
              <td>{employee.joiningDate}</td>
              <td>
               <button className="view-button"
               onClick={() => navigate(`/employees/${employee.id}`)}>
                View
                </button>

                <button
                className="edit-button"
                onClick={() => navigate(`/employees/${employee.id}/edit`)}>
                  Edit
                  </button>

                  <button
                  className="delete-button"
                  onClick={() => setEmployeeToDelete(employee)}>
                    Delete
                    </button>
                      </td>
                        </tr>
                        ))
                      ) : (
                      <tr>
                        <td colSpan={6}>
                          <EmptyState />
                          </td>
                          </tr>
                        )}
                        </tbody>
                        </table>
                        </div>
                        <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}/>
                        </section>
                        {employeeToDelete && (
                          <DeleteConfirmation
                          employeeName={`${employeeToDelete.firstName} ${employeeToDelete.lastName}`}
                          onCancel={() => setEmployeeToDelete(null)}
                          onConfirm={async () => {
                            const employee = employeeToDelete;
                            if (!employee) {
                              return;
                            }

                            await deleteEmployee(employee);

                            const updatedEmployees = employees.filter(
                              (item) => item.id !== employee.id);
                              setEmployees(updatedEmployees);
                              const newTotalPages = Math.ceil(
                                updatedEmployees.length / employeesPerPage);

                                if (currentPage > newTotalPages && newTotalPages > 0) {
                                  setCurrentPage(newTotalPages);
                                }
                                setEmployeeToDelete(null);
                              }}
                              />
                              )}
                              </>
                              );
                            }
                            export default EmployeeTable;