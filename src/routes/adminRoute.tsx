import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

const AdminRoute=()=>
{
const { user } = useUser();
if(user?.role!=='Admin')
     return <Navigate to="/home" replace/>
return <Outlet/>

}
export default AdminRoute