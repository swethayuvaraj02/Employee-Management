import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Employee } from "../types/employee";
import { getEmployeeById } from "../services/employeeService";
import EmployeeForm from "./EmployeeForm";

function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      <h2>Edit Employee</h2>

      <EmployeeForm
      employee={employee}
      onSuccess={() => navigate("/")}
      onCancel={() => navigate("/")}
      />
    </div>
  );
}

export default EditEmployee;