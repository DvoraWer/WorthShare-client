import { Link } from "react-router-dom";
import LoginForm from "../features/loginForm";
const LoginPage = () => {
  return (
    <>
      <aside className="auth-side">
        <h1>המלצות ששוות <span>שיתוף.</span></h1>
        <p>הפלטפורמה המרכזית להמלצות ושיתופים מניסיון, כי ההמלצה שלכם יכולה לעזור לעוד אנשים...</p>
      </aside>
      <LoginForm />
      <p className="auth-note">
        אין לך חשבון?{" "}
        <Link to="/register">הירשם כאן</Link>
      </p>
    </>
  );
};

export default LoginPage;

