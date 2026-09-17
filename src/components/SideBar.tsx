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
              <a href="/">Dashboard</a>
          </li>

          <li>
           <a href="#employees">Employees</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;