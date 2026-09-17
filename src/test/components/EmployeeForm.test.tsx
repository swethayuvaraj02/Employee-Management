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

    const addButton = screen.getByRole("button", {
      name: "Add Employee",
    });

    await user.click(addButton);

    expect(
      screen.getByRole("button", { name: "Add Employee" })
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
      screen.getByRole("button", { name: "Add Employee" })
    );

    const textboxes = screen.getAllByRole("textbox");

    await user.type(textboxes[0], "John");
    await user.type(textboxes[1], "Doe");
    await user.type(textboxes[2], "john@example.com");
    await user.type(textboxes[3], "9876543210");
    await user.type(textboxes[4], "Engineering");
    await user.type(textboxes[5], "Software Engineer");

    const dateInput = document.querySelector(
      'input[type="date"]'
    ) as HTMLInputElement;

    await user.type(dateInput, "2024-01-15");

    await user.click(
      screen.getByRole("button", { name: "Add Employee" })
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
    screen.getByRole("button", { name: "Add Employee" })
  );

  const textboxes = screen.getAllByRole("textbox");

  await user.type(textboxes[1], "Doe");
  await user.type(textboxes[2], "john@example.com");
  await user.type(textboxes[3], "9876543210");
  await user.type(textboxes[4], "Engineering");
  await user.type(textboxes[5], "Software Engineer");

  const dateInput = document.querySelector(
    'input[type="date"]'
  ) as HTMLInputElement;

  await user.type(dateInput, "2024-01-15");

  await user.click(
    screen.getByRole("button", { name: "Add Employee" })
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
    screen.getByRole("button", { name: "Add Employee" })
  );

  const textboxes = screen.getAllByRole("textbox");

  await user.type(textboxes[0], "John");
  await user.type(textboxes[2], "john@example.com");
  await user.type(textboxes[3], "9876543210");
  await user.type(textboxes[4], "Engineering");
  await user.type(textboxes[5], "Software Engineer");

  const dateInput = document.querySelector(
    'input[type="date"]'
  ) as HTMLInputElement;

  await user.type(dateInput, "2024-01-15");

  await user.click(
    screen.getByRole("button", { name: "Add Employee" })
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
    screen.getByRole("button", { name: "Add Employee" })
  );

  const textboxes = screen.getAllByRole("textbox");

  await user.type(textboxes[0], "John");
  await user.type(textboxes[1], "Doe");
  await user.type(textboxes[2], "john@example");
  await user.type(textboxes[3], "9876543210");
  await user.type(textboxes[4], "Engineering");
  await user.type(textboxes[5], "Software Engineer");

  const dateInput = document.querySelector(
    'input[type="date"]'
  ) as HTMLInputElement;

  await user.type(dateInput, "2024-01-15");

  await user.click(
    screen.getByRole("button", { name: "Add Employee" })
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
    screen.getByRole("button", { name: "Add Employee" })
  );

  const textboxes = screen.getAllByRole("textbox");

  await user.type(textboxes[0], "John");
  await user.type(textboxes[1], "Doe");
  await user.type(textboxes[2], "john@example.com");
  await user.type(textboxes[3], "invalid phone");
  await user.type(textboxes[4], "Engineering");
  await user.type(textboxes[5], "Software Engineer");

  const dateInput = document.querySelector(
    'input[type="date"]'
  ) as HTMLInputElement;

  await user.type(dateInput, "2024-01-15");

  await user.click(
    screen.getByRole("button", { name: "Add Employee" })
  );

  expect(
    screen.getByText("Please enter the valid phone number")
  ).toBeInTheDocument();
});

it("should show a validation error when the department field is lfet empty", async () => {
  vi.mocked(getEmployees).mockResolvedValue([]);

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  await user.click(
    screen.getByRole("button", { name: "Add Employee" })
  );

  const textboxes = screen.getAllByRole("textbox");

  await user.type(textboxes[0], "John");
  await user.type(textboxes[1], "Doe");
  await user.type(textboxes[2], "john@example.com");
  await user.type(textboxes[3], "9876543210");
  await user.type(textboxes[5], "Software Engineer");

  const dateInput = document.querySelector(
    'input[type="date"]'
  ) as HTMLInputElement;

  await user.type(dateInput, "2024-01-15");

  await user.click(
    screen.getByRole("button", { name: "Add Employee" })
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
    screen.getByRole("button", { name: "Add Employee" })
  );

  const textboxes = screen.getAllByRole("textbox");

  await user.type(textboxes[0], "John");
  await user.type(textboxes[1], "Doe");
  await user.type(textboxes[2], "john@example.com");
  await user.type(textboxes[3], "9876543210");

  await user.click(
    screen.getByRole("button", { name: "Cancel" })
  );

  expect(
    screen.queryByRole("button", { name: "Cancel" })
  ).not.toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: "Add Employee" })
  ).toBeInTheDocument();
});


});