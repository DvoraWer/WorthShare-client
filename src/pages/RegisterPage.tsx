import { Link } from "react-router-dom"
import RegisterForm from "../features/registerForm"

const RegisterPage=()=>
{
    return(<><RegisterForm/>
    <p>יש לכם כבר חשבון? {" "}
        <Link to={"/login"}>התחברו כאן</Link>

    </p>
    </>) 
}
export default RegisterPage