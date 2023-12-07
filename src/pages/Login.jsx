import { Link } from "react-router-dom";
import { LoginForm } from "../components/Widget/form/login_form/LoginForm";
import { OutlineButton } from "../components";
import { HOME_ROUTE } from "../config";

const Login = () => {
  return (
    <div className="bg-[#262626] h-screen flex items-center justify-center">
      <LoginForm>
        <ul className="flex justify-center text-blue-400 mt-10">
          <li>
            <Link to={HOME_ROUTE}>
              <OutlineButton
                bordercolorDark="border-green-700"
                bordercolorLight="border-green-500"
                textcolorDark="text-green-700"
                textcolorLight="text-green-500"
              >
                بازگشت به سایت
              </OutlineButton>
            </Link>
          </li>
        </ul>
      </LoginForm>
    </div>
  );
};

export default Login;
