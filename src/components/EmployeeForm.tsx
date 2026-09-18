import { useState } from "react";

import { createEmployee, updateEmployee } from "../services/employeeService";
import type { Employee } from "../types/employee";

interface EmployeeFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
  employee?: Employee;
}

const departments = [
  "Engineering",
  "Design",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Software Engineer",
  "UI/UX Designer",
  "Product Designer",
  "HR Executive",
  "Recruiter",
  "Marketing Specialist",
  "Financial Analyst",
  "Sales Executive",
];

function EmployeeForm({
  onSuccess,
  onCancel,
  employee,
}: EmployeeFormProps) {
  const [firstName, setFirstName] = useState(employee?.firstName || "");
  const [lastName, setLastName] = useState(employee?.lastName || "");
  const [email, setEmail] = useState(employee?.email || "");
  const [phone, setPhone] = useState(employee?.phone || "");
  const [department, setDepartment] = useState(
    employee?.department || ""
  );
  const [role, setRole] = useState(employee?.role || "");
  const [status, setStatus] = useState<"Active" | "Inactive">(
    employee?.status || "Active"
  );
  const [joiningDate, setJoiningDate] = useState(
    employee?.joiningDate || ""
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
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

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");

    if (employee) {
      await updateEmployee({
        id: employee.id,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone,
        department,
        role,
        status,
        joiningDate,
      });
    } else {
      await createEmployee({
        id: `EMP${Date.now()}`,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
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
    <div className="form-card">
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit phone number"
          />
        </div>

        <div className="form-field">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>

            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>

            {roles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "Active" | "Inactive")
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="joiningDate">Joining Date</label>
          <input
            id="joiningDate"
            type="date"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            {employee ? "Update Employee" : "Add Employee"}
          </button>

          {onCancel && (
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;