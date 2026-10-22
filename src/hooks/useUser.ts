import { useContext } from "react"
import { UserContext } from "../context/userContext"


const useUser=()=>
{
const context = useContext(UserContext);
if(!context)
    throw new Error('useUser must be inside UserProvider');
return context;
}
export default useUser