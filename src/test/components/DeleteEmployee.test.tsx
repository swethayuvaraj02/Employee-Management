import { render, screen } from "@testing-library/react";
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

    vi.spyOn(window, "confirm").mockReturnValue(false);

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

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete John Doe?"
    );
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

    vi.spyOn(window, "confirm").mockReturnValue(false);

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

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(deleteEmployee).not.toHaveBeenCalled();
  });

  it(" should delete the employee when deletion is confirmed", async () => {
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

  vi.mocked(deleteEmployee).mockResolvedValue({
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

  vi.spyOn(window, "confirm").mockReturnValue(true);

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

  await user.click(screen.getByRole("button", { name: "Delete" }));

  expect(deleteEmployee).toHaveBeenCalledWith(
    expect.objectContaining({
      id: "EMP001",
    })
  );
});

it("should remove the employee from the table after deletion", async () => {
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

  vi.mocked(deleteEmployee).mockResolvedValue({
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

  vi.spyOn(window, "confirm").mockReturnValue(true);

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

  await user.click(screen.getByRole("button", { name: "Delete" }));

  await vi.waitFor(() => {
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
});
