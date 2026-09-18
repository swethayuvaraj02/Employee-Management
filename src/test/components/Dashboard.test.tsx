import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Dashboard from "../../components/Dashboard";
import { getEmployees } from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployees: vi.fn(),
}));

describe("Dashboard", () => {

  it("should load the dashboard", () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Welcome to the Employee Management Dashboard")
    ).toBeInTheDocument();
  });

  it("should display employees when employee data loads", async () => {
    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "Aarav",
        lastName: "Sharma",
        email: "aarav.sharma@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Frontend Developer",
        status: "Active",
        joiningDate: "2024-01-15",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Aarav Sharma")
    ).toBeInTheDocument();
  });

  it("should display the correct employee count", async () => {
    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "Aarav",
        lastName: "Sharma",
        email: "aarav@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Frontend Developer",
        status: "Active",
        joiningDate: "2024-01-15",
      },
      {
        id: "EMP002",
        firstName: "Priya",
        lastName: "Iyer",
        email: "priya@example.com",
        phone: "9876543211",
        department: "Design",
        role: "UI/UX Designer",
        status: "Active",
        joiningDate: "2023-08-21",
      },
      {
        id: "EMP003",
        firstName: "Rahul",
        lastName: "Verma",
        email: "rahul@example.com",
        phone: "9876543212",
        department: "Engineering",
        role: "Backend Developer",
        status: "Inactive",
        joiningDate: "2022-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const totalCard = await screen
      .findByText("Total Employees")
      .then((element) => element.parentElement);

    expect(totalCard).toHaveTextContent("Total Employees");
    await waitFor(() => {
      expect(totalCard).toHaveTextContent("3");
    });
  });

 it("should display the correct active employee count", async () => {
  vi.mocked(getEmployees).mockResolvedValue([
    {
      id: "EMP001",
      firstName: "Aarav",
      lastName: "Sharma",
      email: "aarav@example.com",
      phone: "9876543210",
      department: "Engineering",
      role: "Frontend Developer",
      status: "Active",
      joiningDate: "2024-01-15",
    },
    {
      id: "EMP002",
      firstName: "Priya",
      lastName: "Iyer",
      email: "priya@example.com",
      phone: "9876543211",
      department: "Design",
      role: "UI/UX Designer",
      status: "Active",
      joiningDate: "2023-08-21",
    },
    {
      id: "EMP003",
      firstName: "Rahul",
      lastName: "Verma",
      email: "rahul@example.com",
      phone: "9876543212",
      department: "Engineering",
      role: "Backend Developer",
      status: "Inactive",
      joiningDate: "2022-11-10",
    },
  ]);

  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  const activeCard = await screen
    .findByText("Active Employees")
    .then((element) => element.parentElement);

  expect(activeCard).toHaveTextContent("Active Employees");

  await waitFor(() => {
    expect(activeCard).toHaveTextContent("2");
  });
});

  it("should display the correct inactive employee count", async () => {
    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "Aarav",
        lastName: "Sharma",
        email: "aarav@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Frontend Developer",
        status: "Active",
        joiningDate: "2024-01-15",
      },
      {
        id: "EMP002",
        firstName: "Priya",
        lastName: "Iyer",
        email: "priya@example.com",
        phone: "9876543211",
        department: "Design",
        role: "UI/UX Designer",
        status: "Active",
        joiningDate: "2023-08-21",
      },
      {
        id: "EMP003",
        firstName: "Rahul",
        lastName: "Verma",
        email: "rahul@example.com",
        phone: "9876543212",
        department: "Engineering",
        role: "Backend Developer",
        status: "Inactive",
        joiningDate: "2022-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const inactiveCard = await screen
      .findByText("Inactive Employees")
      .then((element) => element.parentElement);

    expect(inactiveCard).toHaveTextContent("Inactive Employees");
    expect(inactiveCard).toHaveTextContent("1");
  });

  it("should display the empty state", async () => {
    vi.mocked(getEmployees).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("No employees found.")
    ).toBeInTheDocument();
  });

  it("should display the loading state", () => {
    vi.mocked(getEmployees).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Loading employees...")
    ).toBeInTheDocument();
  });

});