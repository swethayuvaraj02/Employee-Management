import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import EmployeeDetails from "../../components/EmployeeDetails";
import { getEmployeeById } from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployeeById: vi.fn(),
}));

describe("ViewEmployee", () => {
  it("should display employee details correctly", async () => {
    vi.mocked(getEmployeeById).mockResolvedValue({
      id: "EMP001",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "9876543210",
      department: "Engineering",
      role: "Software Engineer",
      status: "Active",
      joiningDate: "2024-01-15",
    });

    render(
      <MemoryRouter initialEntries={["/employees/EMP001"]}>
        <Routes>
          <Route
            path="/employees/:id"
            element={<EmployeeDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Employee Details")
    ).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("9876543210")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("2024-01-15")).toBeInTheDocument();
  });
  
it("should fetch the employee using the correct employee ID", async () => {
  vi.mocked(getEmployeeById).mockResolvedValue({
    id: "EMP005",
    firstName: "Vikram",
    lastName: "Nair",
    email: "vikram@example.com",
    phone: "9876543210",
    department: "Marketing",
    role: "Marketing Specialist",
    status: "Active",
    joiningDate: "2023-06-18",
  });

  render(
    <MemoryRouter initialEntries={["/employees/EMP005"]}>
      <Routes>
        <Route
          path="/employees/:id"
          element={<EmployeeDetails />}
        />
      </Routes>
    </MemoryRouter>
  );

  await screen.findByText("Vikram Nair");

  expect(getEmployeeById).toHaveBeenCalledWith("EMP005");
});
});