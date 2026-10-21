import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  if (!context) {
    throw new Error('Navbar must be inside UserProvider');
  }

  const { user, setUser } = context;
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <nav>
      <span>שלום, {user?.fullName}</span>
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
