import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav>

      <div>
        {user ? (
          <>
            <span>Hi, {user.username}</span>
            <Link to="/dashboard">Dashboard</Link>
            <button data-testid="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            
            <Link className="nav-auth-link" to="/login">Login</Link>
            <Link className="nav-auth-link" to="/register">Register</Link>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;