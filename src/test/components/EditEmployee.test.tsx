import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import EditEmployee from "../../components/EditEmployee";
import userEvent from "@testing-library/user-event";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployeeById: vi.fn(),
  updateEmployee: vi.fn(),
}));

describe("EditEmployee", () => {
  it("should open the Edit Employee form with existing employee details", async () => {
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
      <MemoryRouter initialEntries={["/employees/EMP001/edit"]}>
        <Routes>
          <Route
            path="/employees/:id/edit"
            element={<EditEmployee />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByDisplayValue("John")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Doe")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("john@example.com")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("9876543210")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Engineering")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Software Engineer")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("2024-01-15")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Update Employee" })
    ).toBeInTheDocument();
  });


it("should update employee details successfully", async () => {
  const user = userEvent.setup();

  const employee = {
    id: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9876543210",
    department: "Engineering",
    role: "Software Engineer",
    status: "Active" as const,
    joiningDate: "2024-01-15",
  };

  vi.mocked(getEmployeeById).mockResolvedValue(employee);
  vi.mocked(updateEmployee).mockResolvedValue({
    ...employee,
    firstName: "Johnny",
  });

  render(
    <MemoryRouter initialEntries={["/employees/EMP001/edit"]}>
      <Routes>
        <Route
          path="/employees/:id/edit"
          element={<EditEmployee />}
        />
      </Routes>
    </MemoryRouter>
  );

  const firstNameInput = await screen.findByDisplayValue("John");

  await user.clear(firstNameInput);
  await user.type(firstNameInput, "Johnny");

  await user.click(
    screen.getByRole("button", { name: "Update Employee" })
  );

  expect(updateEmployee).toHaveBeenCalledWith({
    ...employee,
    firstName: "Johnny",
  });
});

it("should display validation message for invalid email", async () => {
  const user = userEvent.setup();

  vi.mocked(updateEmployee).mockClear();

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
    <MemoryRouter initialEntries={["/employees/EMP001/edit"]}>
      <Routes>
        <Route
          path="/employees/:id/edit"
          element={<EditEmployee />}
        />
      </Routes>
    </MemoryRouter>
  );

  const emailInput = await screen.findByDisplayValue("john@example.com");

  await user.clear(emailInput);
  await user.type(emailInput, "invalid@email");

  await user.click(
    screen.getByRole("button", { name: "Update Employee" })
  );

  expect(
    await screen.findByText("Please enter a valid email address.")
  ).toBeInTheDocument();

  expect(updateEmployee).not.toHaveBeenCalled();
});

it("should cancel edit without updating the employee", async () => {
  const user = userEvent.setup();

  vi.mocked(updateEmployee).mockClear();

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
    <MemoryRouter initialEntries={["/employees/EMP001/edit"]}>
      <Routes>
        <Route
          path="/employees/:id/edit"
          element={<EditEmployee />}
        />
        <Route
          path="/"
          element={<div>Dashboard</div>}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(
    await screen.findByDisplayValue("John")
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("button", { name: "Cancel" })
  );

  expect(
    screen.getByText("Dashboard")
  ).toBeInTheDocument();

  expect(updateEmployee).not.toHaveBeenCalled();
});
});
