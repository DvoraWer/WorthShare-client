import { NavLink, Outlet } from "react-router-dom";

const AdminLayout=()=>
{
  return (
<section>
    <h1>איזור ניהול</h1>
    <nav>
        <NavLink to="/admin/sponsorships">ניהול בקשות חסות</NavLink>
        <NavLink to="/admin/categories">ניהול קטגוריות</NavLink>
        <NavLink to="/admin/users">ניהול משתמשים</NavLink>
    </nav>
    <Outlet/>
</section>
  );
}
export default AdminLayout