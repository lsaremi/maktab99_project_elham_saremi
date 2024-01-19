import { useSelector } from "react-redux";
import { LoginForm } from "../components/Widget/form/login_form/LoginForm";

const Login = () => {
  const shouldNavigate = useSelector((state) => state.auth.isLogin);
  return (
    <div className="bg-[#262626] h-screen flex items-center justify-center">
      <LoginForm shouldNavigate={shouldNavigate} />
    </div>
  );
};

export default Login;
