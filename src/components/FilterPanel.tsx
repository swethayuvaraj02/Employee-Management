import { useEffect, useRef, useState } from "react";

interface FilterPanelProps {
  department: string;
  onDepartmentChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  sortOrder: string;
  onSortOrderChange: (value: string) => void;
}

interface CustomDropdownProps {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}

function CustomDropdown({
  value,
  options,
  placeholder,
  onChange,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!isOpen) {
      const rect = dropdownRef.current?.getBoundingClientRect();

      if (rect) {
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        const estimatedMenuHeight = options.length * 40 + 20;

        setOpenUpward(
          spaceBelow < estimatedMenuHeight &&
            spaceAbove > spaceBelow
        );
      }
    }

    setIsOpen((prev) => !prev);
  };

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
  <div
    ref={dropdownRef}
    className={`custom-dropdown ${
      openUpward ? "open-upward" : ""
    }`}
  >
    <button
      type="button"
      className="custom-dropdown-trigger"
      onClick={toggleDropdown}
    >
      <span>{value || placeholder}</span>
      <span className={`dropdown-arrow ${isOpen ? "open" : ""}`} />
    </button>

    {isOpen && (
      <div className="custom-dropdown-menu">
        {value && (
          <button
            type="button"
            onClick={() => selectOption("")}
          >
            {placeholder}
          </button>
        )}

        {options
          .filter((option) => option !== value)
          .map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => selectOption(option)}
            >
              {option}
            </button>
          ))}
      </div>
    )}
  </div>
);
}

function FilterPanel({
  department,
  onDepartmentChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: FilterPanelProps) {
  const departments = [
    "Engineering",
    "Design",
    "HR",
    "Marketing",
    "Finance",
    "Sales",
  ];

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Designer",
    "HR Executive",
    "Recruiter",
    "Marketing Specialist",
    "Financial Analyst",
    "Sales Executive",
  ];

  const statuses = [
    "Active",
    "Inactive",
  ];

  const sortOptions = [
    "Name",
    "Joining Date",
    "Department",
    "Status",
  ];

  const sortOrders = [
    "Ascending",
    "Descending",
  ];

  return (
    <div className="filter-panel">

      {/* Department */}
      <CustomDropdown
        value={department}
        options={departments}
        placeholder="All Departments"
        onChange={onDepartmentChange}
      />

      {/* Role */}
      <CustomDropdown
        value={role}
        options={roles}
        placeholder="All Roles"
        onChange={onRoleChange}
      />

      {/* Status */}
      <CustomDropdown
        value={status}
        options={statuses}
        placeholder="All Status"
        onChange={onStatusChange}
      />

      {/* Sort By */}
      <CustomDropdown
        value={sortBy}
        options={sortOptions}
        placeholder="Sort By"
        onChange={(value) => {
          const sortValue =
            value === "Name"
              ? "name"
              : value === "Joining Date"
              ? "joiningDate"
              : value === "Department"
              ? "department"
              : value === "Status"
              ? "status"
              : "";

          onSortByChange(sortValue);
        }}
      />

      {/* Sort Order */}
      <CustomDropdown
        value={sortOrder}
        options={sortOrders}
        placeholder="Sort Order"
        onChange={onSortOrderChange}
      />

    </div>
  );
}

export default FilterPanel;