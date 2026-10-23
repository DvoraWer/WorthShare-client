import { Link } from "react-router-dom"
import RegisterForm from "../features/registerForm"

const RegisterPage = () => {
    return (<>
        <aside className="auth-side auth-side-teal">
            <h1>יש לך משהו ששווה <span>לספר?</span></h1>
            <p>פותחים חשבון, כותבים המלצה בכמה שורות ושומרים המלצות שאוהבים.</p>
        </aside><RegisterForm />
        <p className="auth-note">יש לכם כבר חשבון? {" "}
            <Link to={"/login"}>התחברו כאן</Link>

        </p>
    </>)
}
export default RegisterPage