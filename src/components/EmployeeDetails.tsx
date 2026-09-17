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
    return <p>Employee not found.</p>;
  }

  return (
    <div className="page-content">
    <div className="model-overlay">
      <div className="model">
        <h2>Employee Details</h2>

        <p>
          <strong>ID:</strong> {employee.id}
        </p>

        <p>
          <strong>Name:</strong> {employee.firstName} {employee.lastName}
        </p>

        <p>
          <strong>Email:</strong> {employee.email}
        </p>

        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>

        <p>
          <strong>Department:</strong> {employee.department}
        </p>

        <p>
          <strong>Role:</strong> {employee.role}
        </p>

        <p>
          <strong>Status:</strong> {employee.status}
        </p>

        <p>
          <strong>Joining Date:</strong> {employee.joiningDate}
        </p>
      </div>
    </div>
    </div>
  );
}

export default EmployeeDetails;