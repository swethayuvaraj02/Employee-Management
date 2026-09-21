import { NavLink } from "react-router-dom";

interface SidebarProps {
  onMenuClick: () => void;
  isOpen: boolean;
}

function Sidebar({ onMenuClick, isOpen }: SidebarProps) {

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="mobile-menu">
      <button className="menu-button" onClick={onMenuClick}>
        ⋮
      </button>
      </div>

      <nav>
  <ul>
    <li>
     <NavLink
  to="/#top"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  Dashboard
</NavLink>
    </li>

    <li>
      <NavLink
  to="/employees#employees"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  Employees
</NavLink>
    </li>
  </ul>
</nav>
    </aside>
  );
}

export default Sidebar;