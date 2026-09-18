import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Employee } from "../types/employee";
import { getEmployeeById } from "../services/employeeService";

function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (!id) return;

    getEmployeeById(id).then((data) => {
      if (data) {
        setEmployee(data);
      }
    });
  }, [id]);

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
  <main className="page-content">
    <div className="page-heading">
      <h2>Employee Details</h2>
      <p>View the employee's information below.</p>
    </div>

    <div className="details-card">
      <p>
  <strong>Name:</strong>
  <span className="details-value">
    {employee.firstName} {employee.lastName}
  </span>
</p>

<p>
  <strong>Email:</strong>
  <span className="details-value">{employee.email}</span>
</p>

<p>
  <strong>Phone:</strong>
  <span className="details-value">{employee.phone}</span>
</p>

<p>
  <strong>Department:</strong>
  <span className="details-value">{employee.department}</span>
</p>

<p>
  <strong>Role:</strong>
  <span className="details-value">{employee.role}</span>
</p>
      <p>
  <strong>Status:</strong>
  <span className={`status-badge ${employee.status.toLowerCase()}`}>
    {employee.status}
  </span>
</p>

     <p>
  <strong>Joining Date:</strong>
  <span className="details-value">{employee.joiningDate}</span>
</p>
    </div>
  </main>
);
}

export default EmployeeDetails;