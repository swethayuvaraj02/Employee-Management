import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Employee } from "../types/employee";
import { getEmployeeById } from "../services/employeeService";
import EmployeeForm from "./EmployeeForm";

function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(() => Boolean(id));

  useEffect(() => {
    if (!id) {
      return;
    }

    getEmployeeById(id)
      .then((data) => {
        setEmployee(data || null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="page-content">
        <div className="loading-state">Loading employee...</div>
      </main>
    );
  }

  if (!employee) {
    return (
      <main className="page-content">
        <div className="empty-state">
          <h2>Employee not found</h2>
          <button
            className="primary-button"
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="page-heading">
        <div>
          <h2>Edit Employee</h2>
          <p>Update the employee's information below.</p>
        </div>
      </div>

      <EmployeeForm
        employee={employee}
        onSuccess={() => navigate("/")}
        onCancel={() => navigate("/")}
      />
    </main>
  );
}

export default EditEmployee;