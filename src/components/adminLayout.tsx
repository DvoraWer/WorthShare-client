import { NavLink, Outlet } from "react-router-dom";

const AdminLayout=()=>
{
  return (
<section className="stack">
    <h1 className="hero hero-plum">איזור ניהול</h1>
    <nav className="tabs">
        <NavLink to="/admin/sponsorships">ניהול בקשות חסות</NavLink>
        <NavLink to="/admin/categories">ניהול קטגוריות</NavLink>
        <NavLink to="/admin/users">ניהול משתמשים</NavLink>
    </nav>
    <Outlet/>
</section>
  );
}
export default AdminLayout