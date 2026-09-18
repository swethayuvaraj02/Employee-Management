import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Dashboard from "../../components/Dashboard";
import { getEmployees } from "../../services/employeeService";
import type { Employee } from "../../types/employee";

vi.mock("../../services/employeeService", () => ({
  getEmployees: vi.fn(),
}));

const employees: Employee[] = [
  {
    id: "EMP001",
    firstName: "Aarav",
    lastName: "Iyer",
    email: "aarav@example.com",
    phone: "9876543210",
    department: "Engineering",
    role: "Frontend Developer",
    status: "Active",
    joiningDate: "2024-01-15",
  },
  {
    id: "EMP002",
    firstName: "Meera",
    lastName: "Rao",
    email: "meera@example.com",
    phone: "9876543211",
    department: "Finance",
    role: "Financial Analyst",
    status: "Inactive",
    joiningDate: "2022-11-10",
  },
  {
    id: "EMP003",
    firstName: "Zara",
    lastName: "Sharma",
    email: "zara@example.com",
    phone: "9876543212",
    department: "Design",
    role: "UI/UX Designer",
    status: "Active",
    joiningDate: "2023-08-21",
  },
];

describe("Pagination", () => {
  it("should display pagination controls", async () => {
    vi.mocked(getEmployees).mockResolvedValue(employees);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("button", { name: "Previous" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Next" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "1" })
    ).toBeInTheDocument();
  });

  it("should disable Previous button on the first page", async () => {
    vi.mocked(getEmployees).mockResolvedValue(employees);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const previousButton = await screen.findByRole("button", {
      name: "Previous",
    });

    expect(previousButton).toBeDisabled();
  });

  it("should disable Next button on the last page", async () => {
    vi.mocked(getEmployees).mockResolvedValue(employees);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const nextButton = await screen.findByRole("button", {
      name: "Next",
    });

    expect(nextButton).toBeDisabled();
  });

  it("should display the correct employees per page", async () => {
    vi.mocked(getEmployees).mockResolvedValue(employees);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const rows = await screen.findAllByRole("row");

    expect(rows).toHaveLength(4);
    expect(rows[1]).toHaveTextContent("Aarav Iyer");
    expect(rows[2]).toHaveTextContent("Meera Rao");
    expect(rows[3]).toHaveTextContent("Zara Sharma");
  });

  it("should move to the next page when Next is clicked", async () => {
  const manyEmployees: Employee[] = Array.from(
    { length: 15 },
    (_, index) => ({
      id: `EMP${String(index + 1).padStart(3, "0")}`,
      firstName: `Employee${index + 1}`,
      lastName: "Test",
      email: `employee${index + 1}@example.com`,
      phone: "9876543210",
      department: "Engineering",
      role: "Software Engineer",
      status: "Active",
      joiningDate: "2024-01-15",
    })
  );

  vi.mocked(getEmployees).mockResolvedValue(manyEmployees);

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  expect(await screen.findByText("Employee1 Test")).toBeInTheDocument();

  const nextButton = screen.getByRole("button", {
    name: "Next",
  });

  await user.click(nextButton);

  expect(screen.getByText("Employee11 Test")).toBeInTheDocument();
  expect(screen.queryByText("Employee1 Test")).not.toBeInTheDocument();
});

  it("should move to the previous page when Previous is clicked", async () => {
    const manyEmployees: Employee[] = Array.from(
      { length: 15 },
      (_, index) => ({
        id: `EMP${String(index + 1).padStart(3, "0")}`,
        firstName: `Employee${index + 1}`,
        lastName: "Test",
        email: `employee${index + 1}@example.com`,
        phone: "9876543210",
        department: "Engineering",
        role: "Software Engineer",
        status: "Active",
        joiningDate: "2024-01-15",
      })
    );

    vi.mocked(getEmployees).mockResolvedValue(manyEmployees);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(await screen.findByText("Employee1 Test")).toBeInTheDocument();

    const nextButton = screen.getByRole("button", {
      name: "Next",
    });

    await user.click(nextButton);

    expect(screen.getByText("Employee11 Test")).toBeInTheDocument();

    const previousButton = screen.getByRole("button", {
      name: "Previous",
    });

    await user.click(previousButton);

    expect(screen.getByText("Employee1 Test")).toBeInTheDocument();
    expect(screen.queryByText("Employee11 Test")).not.toBeInTheDocument();
  });

    it("should return to page 1 when a filter is applied", async () => {
    const manyEmployees: Employee[] = Array.from(
      { length: 25 },
      (_, index) => ({
        id: `EMP${String(index + 1).padStart(3, "0")}`,
        firstName: `Employee${index + 1}`,
        lastName: "Test",
        email: `employee${index + 1}@example.com`,
        phone: "9876543210",
        department: index < 10 ? "Engineering" : "Design",
        role: "Software Engineer",
        status: "Active",
        joiningDate: "2024-01-15",
      })
    );

    vi.mocked(getEmployees).mockResolvedValue(manyEmployees);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(await screen.findByText("Employee1 Test")).toBeInTheDocument();

    const nextButton = screen.getByRole("button", {
      name: "Next",
    });

    await user.click(nextButton);
    await user.click(nextButton);

    expect(screen.getByText("Employee21 Test")).toBeInTheDocument();

    const departmentFilter = screen.getByRole("button", {
  name: "All Departments",
});

await user.click(departmentFilter);

await user.click(
  screen.getByRole("button", {
    name: "Engineering",
  })
);

    expect(screen.getByText("Employee1 Test")).toBeInTheDocument();
    expect(screen.queryByText("Employee21 Test")).not.toBeInTheDocument();
  });
});