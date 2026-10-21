import { Link } from "react-router-dom";
import LoginForm from "../features/loginForm";
const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <p>
        אין לך חשבון?{" "}
        <Link to="/register">הירשם כאן</Link>
      </p>
    </>
  );
};

export default LoginPage;

