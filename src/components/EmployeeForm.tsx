import { useState } from "react";

import { createEmployee, updateEmployee } from "../services/employeeService";
import type { Employee } from "../types/employee";

interface EmployeeFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
  employee?: Employee;
}

function EmployeeForm({ onSuccess, onCancel, employee }: EmployeeFormProps)  {

const [firstName, setFirstName] = useState(employee?.firstName || "");
const [lastName, setLastName] = useState(employee?.lastName || "");
const [email, setEmail] = useState(employee?.email || "");
const [phone, setPhone] = useState(employee?.phone || "");
const [department, setDepartment] = useState(employee?.department || "");
const [role, setRole] = useState(employee?.role || "");
const [status, setStatus] = useState<"Active" | "Inactive">(employee?.status || "Active");
const [joiningDate, setJoiningDate] = useState(employee?.joiningDate || "");
const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (
  !firstName ||
  !lastName ||
  !email ||
  !phone ||
  !department ||
  !role ||
  !joiningDate
) {
  setError("Please fill in all fields.");
  return;
}

if (!email.includes("@") || !email.includes(".")) {
  setError("Please enter a valid email address.");
  return;
}

if (phone.length !== 10 || !/^\d+$/.test(phone)){
  setError("Please enter the valid phone number")
  return;
}

setError("");

  if (employee) {
    await updateEmployee({
      id: employee.id,
      firstName,
      lastName,
      email,
      phone,
      department,
      role,
      status,
      joiningDate,
    });
  } else {
    await createEmployee({
      id: `EMP${Date.now()}`,
      firstName,
      lastName,
      email,
      phone,
      department,
      role,
      status,
      joiningDate,
    });
  }
  onSuccess();
};

return (
  <>
   {error && <p className="form-error">{error}</p>}

<form className="employee-form" onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label>Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      <div>
        <label>Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "Active" | "Inactive")
          }
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label>Joining Date</label>
        <input
          type="date"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
        />
      </div>

      <button type="submit">
  {employee ? "Update Employee" : "Add Employee"}
</button>

{onCancel && (
  <button type="button" className="cancel-button" onClick={onCancel}>
    Cancel
  </button>
)}
    </form>
     </>
  );
}

export default EmployeeForm;