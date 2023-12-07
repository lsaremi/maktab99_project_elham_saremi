import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { PANELORDERS_ROUTE, PANELPRODUCTS_ROUTE } from "../../../../config";
import { ButtonContaind } from "../../../Base";
import coffee from "../../../../assets/images/3.png";

export const LoginForm = ({ children }) => {
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
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <section>
      <div className="gap-6 flex h-full flex-nowrap items-center justify-center">
        <div className="mb-12 md:mb-0 lg:ml-8">
          <img src={coffee} alt="" width={400} className="rounded-lg" />
        </div>

        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
              placeholder="نام کاربری را وارد نمایید"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`lg:bg-transparent mt-1 p-2 w-full border rounded-md text-gray-200 font-semibold ${
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
              className={`lg:bg-transparent mt-1 p-2 w-full border rounded-md lg:text-gray-200 font-semibold ${
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
            onClick={() =>
              navigate(`${PANELPRODUCTS_ROUTE}/${PANELORDERS_ROUTE}`)
            }
            bgColorLight="bg-green-500"
            textColor="text-white"
          >
            ورود
          </ButtonContaind>
        </form>
      </div>
      {children}
    </section>
  );
};
