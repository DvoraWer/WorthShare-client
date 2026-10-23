import { NavLink, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar">
      <span className="navbar-greeting">שלום, {user?.fullName}</span>
      <NavLink to="/home">בית</NavLink>
      <NavLink to="/my-recommendations">ההמלצות שלי</NavLink>
      <NavLink to="/favorites">המועדפים שלי</NavLink>
      <NavLink to="/recommendations/new">הוספת המלצה</NavLink>
      {user?.role === 'Admin' && <NavLink to="/admin">ניהול</NavLink>}
      <button type="button" onClick={handleLogout}>התנתקות</button>
    </nav>
  );
};

export default Navbar;
