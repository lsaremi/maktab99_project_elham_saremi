import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../../../features";
import {
  HOME_ROUTE,
  PANELORDERS_ROUTE,
  PANELPRODUCTS_ROUTE,
} from "../../../../config";
import { ButtonContaind, OutlineButton } from "../../../Base";
import coffee from "../../../../assets/images/3.png";

export const LoginForm = ({ shouldNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("نام کاربری الزامی است"),
      password: Yup.string().required("رمز عبور الزامی است"),
    }),
    onSubmit: () => {
      dispatch(loginUser(formik.values));
      if (shouldNavigate) {
        navigate(`${PANELPRODUCTS_ROUTE}/${PANELORDERS_ROUTE}`);
      }
    },
  });

  return (
    <section>
      <div className="gap-6 flex flex-col h-full flex-nowrap items-center justify-center md:flex-row">
        <div className="mb-12 md:mb-0 lg:ml-8">
          <img
            src={coffee}
            alt=""
            className="rounded-lg w-[200px] md:w-[300px] lg:w-[400px]"
          />
        </div>

        <form
          className="flex flex-col px-4 lg:px-0"
          onSubmit={formik.handleSubmit}
        >
          <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold text-center text-white">
            ورود به پنل مدیریت فروشگاه کافی استور
          </h4>

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              placeholder="نام کاربری را وارد نمایید"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`bg-transparent mt-1 p-2 w-full border rounded-md font-semibold ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
            />
            <div className="text-red-500 text-xs mt-1 h-4">
              {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : null}
            </div>
          </div>

          <div className="mb-12">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="رمز عبور را وارد نمایید"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`bg-transparent mt-1 p-2 w-full border rounded-md font-semibold ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:outline-none focus:border-red-500"
                  : "focus:outline-none focus:border-blue-500"
              }`}
            />
            <div className="text-red-500 text-xs mt-1 h-3">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null}
            </div>
          </div>
          <ButtonContaind
            type="submit"
            onClick={formik.handleSubmit}
            bgColorLight="bg-green-500"
            textColor="text-white"
          >
            ورود
          </ButtonContaind>
          {!shouldNavigate &&
            formik.values.password.length !== 0 &&
            formik.values.username.length !== 0 && (
              <p className="text-red-500 text-lg text-center mt-5">
                نام کاربری یا پسورد نادرست است!!
              </p>
            )}
        </form>
      </div>
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
    </section>
  );
};
