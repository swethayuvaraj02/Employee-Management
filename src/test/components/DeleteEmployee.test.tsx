import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import EmployeeTable from "../../components/EmployeeTable";
import { getEmployees, deleteEmployee } from "../../services/employeeService";

vi.mock("../../services/employeeService", () => ({
  getEmployees: vi.fn(),
  deleteEmployee: vi.fn(),
}));

describe("Delete Employee", () => {
  it("should display confirmation when Delete is clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Software Engineer",
        status: "Active",
        joiningDate: "2024-01-15",
      },
    ]);

    render(
      <MemoryRouter>
        <EmployeeTable
          refreshTrigger={0}
          searchTerm=""
          department=""
          role=""
          status=""
          sortBy=""
          sortOrder="Ascending"
        />
      </MemoryRouter>
    );

    expect(await screen.findByText("John Doe")).toBeInTheDocument();

    await user.click(
  screen.getByRole("button", { name: "Delete" })
);

expect(
  screen.getByRole("heading", {
    name: "Delete employee?",
  })
).toBeInTheDocument();

const dialog = screen.getByRole("dialog");

expect(dialog).toHaveTextContent(
  "Are you sure you want to delete John Doe? This action cannot be undone."
);

expect(
  screen.getByRole("button", {
    name: "Delete Employee",
  })
).toBeInTheDocument();

  });

  it("should keep the employee when delete is cancelled", async () => {
    const user = userEvent.setup();

    vi.mocked(getEmployees).mockResolvedValue([
      {
        id: "EMP001",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "9876543210",
        department: "Engineering",
        role: "Software Engineer",
        status: "Active",
        joiningDate: "2024-01-15",
      },
    ]);

    vi.mocked(deleteEmployee).mockClear();

    render(
      <MemoryRouter>
        <EmployeeTable
          refreshTrigger={0}
          searchTerm=""
          department=""
          role=""
          status=""
          sortBy=""
          sortOrder="Ascending"
        />
      </MemoryRouter>
    );

    expect(await screen.findByText("John Doe")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Delete" })
    );

    await user.click(
      screen.getByRole("button", { name: "Cancel" })
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(deleteEmployee).not.toHaveBeenCalled();

    expect(
      screen.queryByRole("heading", {
        name: "Delete employee?",
      })
    ).not.toBeInTheDocument();
  });

  it("should delete the employee when deletion is confirmed", async () => {
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

    vi.mocked(getEmployees).mockResolvedValue([employee]);
    vi.mocked(deleteEmployee).mockResolvedValue(employee);

    render(
      <MemoryRouter>
        <EmployeeTable
          refreshTrigger={0}
          searchTerm=""
          department=""
          role=""
          status=""
          sortBy=""
          sortOrder="Ascending"
        />
      </MemoryRouter>
    );

    expect(await screen.findByText("John Doe")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Delete" })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Delete Employee",
      })
    );

    await waitFor(() => {
      expect(deleteEmployee).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "EMP001",
        })
      );
    });
  });

  it("should remove the employee from the table after deletion", async () => {
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

    vi.mocked(getEmployees).mockResolvedValue([employee]);
    vi.mocked(deleteEmployee).mockResolvedValue(employee);

    render(
      <MemoryRouter>
        <EmployeeTable
          refreshTrigger={0}
          searchTerm=""
          department=""
          role=""
          status=""
          sortBy=""
          sortOrder="Ascending"
        />
      </MemoryRouter>
    );

    expect(await screen.findByText("John Doe")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Delete" })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Delete Employee",
      })
    );

    await waitFor(() => {
      expect(
        screen.queryByText("John Doe")
      ).not.toBeInTheDocument();
    });
  });
});