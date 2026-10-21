import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute=()=>
{
const context = useContext(UserContext);
if(!context)
    throw new Error('AdminRoute must be inside UserProvider');

const { user } = context;
if(user?.role!=='Admin')
     return <Navigate to="/home" replace/>
return <Outlet/>

}
export default AdminRoute