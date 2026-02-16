import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <h2 className="logo">JobTracker</h2>

        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>

          {auth.token && <NavLink to="/jobs">Jobs</NavLink>}
          {!auth.token && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}

          {auth.token && (
            <NavLink to="/login" onClick={handleLogout}>
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
