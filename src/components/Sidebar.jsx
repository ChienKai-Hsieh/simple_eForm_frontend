import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex h-screen bg-base-200">
      <aside className="w-50 border-r border-green-600 bg-base-100 p-4">
        <ul className="menu">
          <li><Link to="forms/system-permission-apply">系統權限申請單</Link></li>
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
