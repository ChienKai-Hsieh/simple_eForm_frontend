import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar border-b border-green-600">
      <div className="flex-1">
        <a className="font-bold text-xl">電子表單系統</a>
      </div>
      <div>
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/logout">登出</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
