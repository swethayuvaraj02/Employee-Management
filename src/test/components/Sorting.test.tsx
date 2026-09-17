import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Dashboard from "../../components/Dashboard";
import { getEmployees } from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployees: vi.fn(),
}));

describe("Sorting", () => {
  it("should sort employees by name in ascending order", async () => {
    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "Zara",
        lastName: "Sharma",
        email: "zara@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Frontend Developer",
        status: "Active",
        joiningDate: "2024-01-15",
      },
      {
        id: "EMP002",
        firstName: "Aarav",
        lastName: "Iyer",
        email: "aarav@example.com",
        phone: "9876543211",
        department: "Design",
        role: "UI/UX Designer",
        status: "Active",
        joiningDate: "2023-08-21",
      },
      {
        id: "EMP003",
        firstName: "Meera",
        lastName: "Rao",
        email: "meera@example.com",
        phone: "9876543212",
        department: "Finance",
        role: "Financial Analyst",
        status: "Inactive",
        joiningDate: "2022-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const sortBy = screen.getByDisplayValue("Sort By");

    await userEvent.selectOptions(sortBy, "name");

    await waitFor(() => {
      const rows = screen.getAllByRole("row");

      expect(rows[1]).toHaveTextContent("Aarav Iyer");
      expect(rows[2]).toHaveTextContent("Meera Rao");
      expect(rows[3]).toHaveTextContent("Zara Sharma");
    });
  });
  
  it("should sort employees by name in descending order", async () => {
    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "Zara",
        lastName: "Sharma",
        email: "zara@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Frontend Developer",
        status: "Active",
        joiningDate: "2024-01-15",
      },
      {
        id: "EMP002",
        firstName: "Aarav",
        lastName: "Iyer",
        email: "aarav@example.com",
        phone: "9876543211",
        department: "Design",
        role: "UI/UX Designer",
        status: "Active",
        joiningDate: "2023-08-21",
      },
      {
        id: "EMP003",
        firstName: "Meera",
        lastName: "Rao",
        email: "meera@example.com",
        phone: "9876543212",
        department: "Finance",
        role: "Financial Analyst",
        status: "Inactive",
        joiningDate: "2022-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const sortBy = screen.getByDisplayValue("Sort By");
    const sortOrder = screen.getByDisplayValue("Ascending");

    await userEvent.selectOptions(sortBy, "name");
    await userEvent.selectOptions(sortOrder, "Descending");

    await waitFor(() => {
      const rows = screen.getAllByRole("row");

      expect(rows[1]).toHaveTextContent("Zara Sharma");
      expect(rows[2]).toHaveTextContent("Meera Rao");
      expect(rows[3]).toHaveTextContent("Aarav Iyer");
    });
  });
  
  it("should sort employees by joining date", async () => {
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
        joiningDate: "2022-08-21",
      },
      {
        id: "EMP003",
        firstName: "Meera",
        lastName: "Rao",
        email: "meera@example.com",
        phone: "9876543212",
        department: "Finance",
        role: "Financial Analyst",
        status: "Inactive",
        joiningDate: "2023-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

const sortBy = screen.getByDisplayValue("Sort By");
const sortOrder = screen.getByDisplayValue("Ascending");

await userEvent.selectOptions(sortBy, "joiningDate");
await userEvent.selectOptions(sortOrder, "Ascending");
    await waitFor(() => {
      const rows = screen.getAllByRole("row");

      expect(rows[1]).toHaveTextContent("Priya Iyer");
      expect(rows[2]).toHaveTextContent("Meera Rao");
      expect(rows[3]).toHaveTextContent("Aarav Sharma");
    });
  });
  
  it("should sort employees by department", async () => {
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
        firstName: "Meera",
        lastName: "Rao",
        email: "meera@example.com",
        phone: "9876543212",
        department: "Finance",
        role: "Financial Analyst",
        status: "Inactive",
        joiningDate: "2022-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

const sortBy = screen.getByDisplayValue("Sort By");
const sortOrder = screen.getByDisplayValue("Ascending");

await userEvent.selectOptions(sortBy, "department");
await userEvent.selectOptions(sortOrder, "Ascending");

await waitFor(() => {
      const rows = screen.getAllByRole("row");

      expect(rows[1]).toHaveTextContent("Design");
      expect(rows[2]).toHaveTextContent("Engineering");
      expect(rows[3]).toHaveTextContent("Finance");
    });
  });
  
  it("should sort employees by status", async () => {
    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "Aarav",
        lastName: "Sharma",
        email: "aarav@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Frontend Developer",
        status: "Inactive",
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
        firstName: "Meera",
        lastName: "Rao",
        email: "meera@example.com",
        phone: "9876543212",
        department: "Finance",
        role: "Financial Analyst",
        status: "Active",
        joiningDate: "2022-11-10",
      },
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

const sortBy = screen.getByDisplayValue("Sort By");
const sortOrder = screen.getByDisplayValue("Ascending");

await userEvent.selectOptions(sortBy, "status");
await userEvent.selectOptions(sortOrder, "Ascending");

    await waitFor(() => {
      const rows = screen.getAllByRole("row");

      expect(rows[1]).toHaveTextContent("Active");
      expect(rows[2]).toHaveTextContent("Active");
      expect(rows[3]).toHaveTextContent("Inactive");
    });
  });
});