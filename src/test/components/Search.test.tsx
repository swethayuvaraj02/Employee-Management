import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Dashboard from "../../components/Dashboard";
import { getEmployees } from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployees: vi.fn(),
}));

describe("Search", () => {

  it("should search employee by first name", async () => {
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
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");

    await userEvent.type(searchInput, "Aarav");

    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Priya Iyer")).not.toBeInTheDocument();
  });

  it("should search employee by last name", async () => {
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
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");

    await userEvent.type(searchInput, "Sharma");

    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Priya Iyer")).not.toBeInTheDocument();
  });

  it("should search employee by Employee ID", async () => {
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
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");

    await userEvent.type(searchInput, "EMP001");

    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Priya Iyer")).not.toBeInTheDocument();
  });

  it("should search employee by email", async () => {
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
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");

    await userEvent.type(searchInput, "aarav@example.com");

    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Priya Iyer")).not.toBeInTheDocument();
  });

  it("should search employee using case-insensitive search", async () => {
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
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");

    await userEvent.type(searchInput, "AARAV SHARMA");

    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Priya Iyer")).not.toBeInTheDocument();
  });

  it("should search employee using partial name", async () => {
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
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");

    await userEvent.type(searchInput, "Aar");

    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Priya Iyer")).not.toBeInTheDocument();
  });

  it("should display empty state when no employee matches search", async () => {
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
    ]);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search employees...");

    await userEvent.type(searchInput, "banana");

    expect(
      screen.getByText("No employees found.")
    ).toBeInTheDocument();
  });

});