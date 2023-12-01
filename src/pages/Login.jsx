import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div>Login</div>
      <button>ورود</button>
      <ul>
        <li>
          <Link to="/">بازگشت به سایت</Link>
        </li>
      </ul>
    </>
  );
};

export default Login;
