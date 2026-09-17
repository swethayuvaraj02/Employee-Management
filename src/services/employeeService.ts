import employees from "../data/employees.json";
import type { Employee } from "../types/employee";

const STORAGE_KEY = "employees";

function getStoredEmployees(): Employee[] {
  const storedEmployees = localStorage.getItem(STORAGE_KEY);

  if (storedEmployees) {
    return JSON.parse(storedEmployees) as Employee[];
  }

  const initialEmployees = employees as Employee[];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEmployees));

  return [...initialEmployees];
}

function saveEmployees(employees: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}


export async function getEmployees(): Promise<Employee[]> {
  await delay(Math.floor(Math.random() * 501) + 500);
  return getStoredEmployees();
}


export async function getEmployeeById(id: string): Promise<Employee | undefined> {
  await delay(Math.floor(Math.random() * 501) + 500);

  return getStoredEmployees().find(
    (employee) => employee.id === id
  );
}

export async function createEmployee(employee: Employee): Promise<Employee> {
  await delay(Math.floor(Math.random() * 501) + 500);

  const storedEmployees = getStoredEmployees();
  storedEmployees.push(employee);
  saveEmployees(storedEmployees);

  return employee;
}

export async function updateEmployee(employee: Employee): Promise<Employee> {
  await delay(Math.floor(Math.random() * 501) + 500);

  const storedEmployees = getStoredEmployees();
  const index = storedEmployees.findIndex(
    (item) => item.id === employee.id
  );

  if (index !== -1) {
    storedEmployees[index] = employee;
    saveEmployees(storedEmployees);
  }
  return employee;
}

export async function deleteEmployee(employee: Employee): Promise<Employee> {
  await delay(Math.floor(Math.random() * 501) + 500);

  const storedEmployees = getStoredEmployees();
  const index = storedEmployees.findIndex(
    (item) => item.id === employee.id
  );

  if (index !== -1) {
    storedEmployees.splice(index, 1);
    saveEmployees(storedEmployees);
  }

  return employee;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
