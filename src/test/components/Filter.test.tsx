import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Dashboard from "../../components/Dashboard";
import { getEmployees } from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployees: vi.fn(),
}));

describe("Filter", () => {

  it("should filter employees by department", async () => {
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
        status: "Inactive",
        joiningDate: "2023-08-21",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const departmentFilter =
      screen.getByDisplayValue("All Departments");

    await userEvent.selectOptions(
      departmentFilter,
      "Engineering"
    );

    expect(
      screen.getByText("Aarav Sharma")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Priya Iyer")
    ).not.toBeInTheDocument();
  });

  it("should filter employees by role", async () => {
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
        status: "Inactive",
        joiningDate: "2023-08-21",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const roleFilter =
      screen.getByDisplayValue("All Roles");

    await userEvent.selectOptions(
      roleFilter,
      "Frontend Developer"
    );

    expect(
      screen.getByText("Aarav Sharma")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Priya Iyer")
    ).not.toBeInTheDocument();
  });

  it("should filter employees by status", async () => {
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
        status: "Inactive",
        joiningDate: "2023-08-21",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const statusFilter =
      screen.getByDisplayValue("All Status");

    await userEvent.selectOptions(
      statusFilter,
      "Active"
    );

    expect(
      screen.getByText("Aarav Sharma")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Priya Iyer")
    ).not.toBeInTheDocument();
  });

  it(" should filter employees using department and role", async () => {
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
        firstName: "Karthik",
        lastName: "Rao",
        email: "karthik@example.com",
        phone: "9876543211",
        department: "Engineering",
        role: "Backend Developer",
        status: "Active",
        joiningDate: "2023-08-21",
      },
      {
        id: "EMP003",
        firstName: "Priya",
        lastName: "Iyer",
        email: "priya@example.com",
        phone: "9876543212",
        department: "Design",
        role: "Frontend Developer",
        status: "Active",
        joiningDate: "2022-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const departmentFilter =
      screen.getByDisplayValue("All Departments");

    const roleFilter =
      screen.getByDisplayValue("All Roles");

    await userEvent.selectOptions(
      departmentFilter,
      "Engineering"
    );

    await userEvent.selectOptions(
      roleFilter,
      "Frontend Developer"
    );

    expect(
      screen.getByText("Aarav Sharma")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Karthik Rao")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Priya Iyer")
    ).not.toBeInTheDocument();
  });


  it(" should filter employees using department, role and status", async () => {
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
        firstName: "Karthik",
        lastName: "Rao",
        email: "karthik@example.com",
        phone: "9876543211",
        department: "Engineering",
        role: "Frontend Developer",
        status: "Inactive",
        joiningDate: "2023-08-21",
      },
      {
        id: "EMP003",
        firstName: "Priya",
        lastName: "Iyer",
        email: "priya@example.com",
        phone: "9876543212",
        department: "Design",
        role: "Frontend Developer",
        status: "Active",
        joiningDate: "2022-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const departmentFilter =
      screen.getByDisplayValue("All Departments");

    const roleFilter =
      screen.getByDisplayValue("All Roles");

    const statusFilter =
      screen.getByDisplayValue("All Status");

    await userEvent.selectOptions(
      departmentFilter,
      "Engineering"
    );

    await userEvent.selectOptions(
      roleFilter,
      "Frontend Developer"
    );

    await userEvent.selectOptions(
      statusFilter,
      "Active"
    );

    expect(
      screen.getByText("Aarav Sharma")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Karthik Rao")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Priya Iyer")
    ).not.toBeInTheDocument();
  });

  it("should display no results when filters have no matching employees", async () => {
    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "Aarav",
        lastName: "Sharma",
        email: "aarav@example.com",
        phone: "9876543210",
        department: "Design",
        role: "UI/UX Designer",
        status: "Active",
        joiningDate: "2024-01-15",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const departmentFilter =
      screen.getByDisplayValue("All Departments");

    await userEvent.selectOptions(
      departmentFilter,
      "Engineering"
    );

    expect(
      screen.getByText("No employees found.")
    ).toBeInTheDocument();
  });

  it("should clear filters and display all employees", async () => {
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
        status: "Inactive",
        joiningDate: "2023-08-21",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const departmentFilter =
      screen.getByDisplayValue("All Departments");

    await userEvent.selectOptions(
      departmentFilter,
      "Engineering"
    );

    expect(
      screen.getByText("Aarav Sharma")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Priya Iyer")
    ).not.toBeInTheDocument();

    await userEvent.selectOptions(
      departmentFilter,
      ""
    );

    expect(
      screen.getByText("Aarav Sharma")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Priya Iyer")
    ).toBeInTheDocument();
  });

});