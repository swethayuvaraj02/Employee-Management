import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Dashboard from "../../components/Dashboard";
import { createEmployee, getEmployees } from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployees: vi.fn(),
  createEmployee: vi.fn(),
}));

describe("EmployeeForm", () => {
  it("should open the Add Employee form", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    ).toBeInTheDocument();
  });

  it("should add an employee when valid data is submitted", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    vi.mocked(createEmployee).mockResolvedValue({
      id: "EMP031",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "9876543210",
      department: "Engineering",
      role: "Software Engineer",
      status: "Active",
      joiningDate: "2024-01-15",
    });

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    await user.type(
      screen.getByLabelText("First Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Last Name"),
      "Doe"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "john@example.com"
    );

    await user.type(
      screen.getByLabelText("Phone"),
      "9876543210"
    );

    await user.selectOptions(
      screen.getByLabelText("Department"),
      "Engineering"
    );

    await user.selectOptions(
      screen.getByLabelText("Role"),
      "Software Engineer"
    );

    const dateInput = document.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;

    await user.type(dateInput, "2024-01-15");

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(createEmployee).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Software Engineer",
        status: "Active",
        joiningDate: "2024-01-15",
      })
    );
  });

  it("should show a validation error when first name is empty", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    await user.type(
      screen.getByLabelText("Last Name"),
      "Doe"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "john@example.com"
    );

    await user.type(
      screen.getByLabelText("Phone"),
      "9876543210"
    );

    await user.selectOptions(
      screen.getByLabelText("Department"),
      "Engineering"
    );

    await user.selectOptions(
      screen.getByLabelText("Role"),
      "Software Engineer"
    );

    const dateInput = document.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;

    await user.type(dateInput, "2024-01-15");

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText("Please fill in all fields.")
    ).toBeInTheDocument();
  });

  it("should show a validation error when last name is empty", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    await user.type(
      screen.getByLabelText("First Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "john@example.com"
    );

    await user.type(
      screen.getByLabelText("Phone"),
      "9876543210"
    );

    await user.selectOptions(
      screen.getByLabelText("Department"),
      "Engineering"
    );

    await user.selectOptions(
      screen.getByLabelText("Role"),
      "Software Engineer"
    );

    const dateInput = document.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;

    await user.type(dateInput, "2024-01-15");

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText("Please fill in all fields.")
    ).toBeInTheDocument();
  });

  it("should show a validation error when email is invalid", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    await user.type(
      screen.getByLabelText("First Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Last Name"),
      "Doe"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "john@example"
    );

    await user.type(
      screen.getByLabelText("Phone"),
      "9876543210"
    );

    await user.selectOptions(
      screen.getByLabelText("Department"),
      "Engineering"
    );

    await user.selectOptions(
      screen.getByLabelText("Role"),
      "Software Engineer"
    );

    const dateInput = document.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;

    await user.type(dateInput, "2024-01-15");

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
  });

  it("should show a validation error when phone number is invalid", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    await user.type(
      screen.getByLabelText("First Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Last Name"),
      "Doe"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "john@example.com"
    );

    await user.type(
      screen.getByLabelText("Phone"),
      "invalid phone"
    );

    await user.selectOptions(
      screen.getByLabelText("Department"),
      "Engineering"
    );

    await user.selectOptions(
      screen.getByLabelText("Role"),
      "Software Engineer"
    );

    const dateInput = document.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;

    await user.type(dateInput, "2024-01-15");

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText("Please enter a valid phone number.")
    ).toBeInTheDocument();
  });

  it("should show a validation error when the department field is left empty", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    await user.type(
      screen.getByLabelText("First Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Last Name"),
      "Doe"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "john@example.com"
    );

    await user.type(
      screen.getByLabelText("Phone"),
      "9876543210"
    );

    // Department intentionally left empty

    await user.selectOptions(
      screen.getByLabelText("Role"),
      "Software Engineer"
    );

    const dateInput = document.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;

    await user.type(dateInput, "2024-01-15");

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    expect(
      screen.getByText("Please fill in all fields.")
    ).toBeInTheDocument();
  });

  it("should close the form when Cancel is clicked without saving changes", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    );

    await user.type(
      screen.getByLabelText("First Name"),
      "John"
    );

    await user.type(
      screen.getByLabelText("Last Name"),
      "Doe"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "john@example.com"
    );

    await user.type(
      screen.getByLabelText("Phone"),
      "9876543210"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Cancel",
      })
    );

    expect(
      screen.queryByRole("button", {
        name: "Cancel",
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Add Employee",
      })
    ).toBeInTheDocument();
  });
});