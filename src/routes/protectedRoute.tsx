import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute=()=>
{
const context = useContext(UserContext);
if(!context)
    throw new Error('ProtectedRoute must be inside UserProvider');

const { user, isLoading } = context;
if(isLoading)
    return<p>טוען..</p>
if(!user)
     return <Navigate to="/login" replace/>
return <Outlet/>

}
export default ProtectedRoute
