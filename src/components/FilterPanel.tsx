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
  

  return (
    <div className="filter-panel">

      <select
        value={department}
        onChange={(event)=>onDepartmentChange(event.target.value)}
      >
        <option value="">All Departments</option>
        <option value="Engineering">Engineering</option>
        <option value="Design">Design</option>
        <option value="HR">HR</option>
        <option value="Marketing">Marketing</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
      </select>

      <select
        value={role}
        onChange={(event) => onRoleChange(event.target.value)}
      >
        <option value="">All Roles</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Full Stack Developer">Full Stack Developer</option>
        <option value="UI/UX Designer">UI/UX Designer</option>
        <option value="Product Designer">Product Designer</option>
        <option value="HR Executive">HR Executive</option>
        <option value="Recruiter">Recruiter</option>
        <option value="Marketing Specialist">Marketing Specialist</option>
        <option value="Financial Analyst">Financial Analyst</option>
        <option value="Sales Executive">Sales Executive</option>
      </select>

      <select value={status} onChange={(event)=> onStatusChange(event.target.value)}>
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select
  value={sortBy}
  onChange={(event) => onSortByChange(event.target.value)}
>
  <option value="">Sort By</option>
  <option value="name">Name</option>
  <option value="joiningDate">Joining Date</option>
  <option value="department">Department</option>
  <option value="status">Status</option>
</select>

      <select
  value={sortOrder}
  onChange={(event) => onSortOrderChange(event.target.value)}
>
         <option value="">Sort Order</option>
         <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>

    </div>
  );
}

export default FilterPanel;