import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import checkoutImg from "../assets/images/checkoutImg.jpeg";

import {
  DatePickerInput,
  OutlineButton,
  TextArea,
  TextInput,
} from "../components";
import { DateObject } from "react-multi-date-picker";
import { useDispatch } from "react-redux";
import { saveUser } from "../features";

const CheckOut = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState([
    new DateObject(),
    new DateObject().add(2, "day"),
  ]);

  const validationSchema = Yup.object({
    firstname: Yup.string().trim().required("وارد کردن نام الزامی است"),
    lastname: Yup.string().trim().required("وارد کردن نام خانوادگی الزامی است"),
    username: Yup.string()
      .trim()
      .matches(/^[a-zA-Z]+$/, "تایپ انگلیسی الزامی است")
      .required("وارد کردن نام کاربری الزامی است"),
    address: Yup.string().trim().required("وارد کردن آدرس الزامی است"),
    phoneNumber: Yup.string()
      .trim()
      .matches(/^09[0|1|2|3][0-9]{8}$/, "شماره همراه معتبر وارد کنید")
      .required("وارد کردن تلفن همراه الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: () => {
      dispatch(saveUser(user));
      formik.resetForm();
      handlePayment();
    },
  });

  const user = {
    firstname: formik.values.firstname,
    lastname: formik.values.lastname,
    username: formik.values.username,
    password: `${formik.values.username}12345678`,
    address: formik.values.address,
    phoneNumber: formik.values.phoneNumber,
  };
  const handlePayment = () => {
    window.location.assign(`http://localhost:3001`);
  };

  return (
    <div className="flex flex-col mt-28 mx-auto gap-5 lg:w-4/5">
      <h3 className="text-lg leading-6 pr-8 font-bold text-right text-green-500">
        نهایی کردن سبد خرید
      </h3>
      <div className="flex flex-col items-center gap-32 w-full mx-auto md:flex-row md:px-12 lg:px-20">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-between flex-1 w-4/5 md:w-1/3 lg:w-[10%]"
        >
          <TextInput
            condition={formik.touched.firstname && formik.errors.firstname}
            error={formik.errors.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstname}
            placeholder="نام را وارد نمایید..."
            label="نام"
            name="firstname"
            id="firstname"
            type="text"
            className={`${
              formik.touched.firstname && formik.errors.firstname
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-blue-500"
            }`}
          />
          <TextInput
            condition={formik.touched.lastname && formik.errors.lastname}
            error={formik.errors.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastname}
            label=" نام خانوادگی "
            placeholder="نام خانوادگی را وارد نمایید..."
            name="lastname"
            id="lastname"
            type="text"
            className={`${
              formik.touched.lastname && formik.errors.lastname
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-blue-500"
            }`}
          />
          <TextInput
            condition={formik.touched.username && formik.errors.username}
            error={formik.errors.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            label="نام کاربری"
            placeholder="نام کاربری را وارد نمایید..."
            name="username"
            id="username"
            type="text"
            className={`${
              formik.touched.username && formik.errors.username
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-blue-500"
            }`}
          />
          <TextInput
            condition={formik.touched.phoneNumber && formik.errors.phoneNumber}
            error={formik.errors.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            placeholder="تلفن همراه را وارد نمایید..."
            label="تلفن همراه "
            name="phoneNumber"
            id="phoneNumber"
            type="text"
            className={`${
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-blue-500"
            }`}
          />

          <div className="mb-4 w-full text-right">
            <label className="text-orange-300 mb-2 flex items-center gap-4">
              تاریخ تحویل :
            </label>

            <DatePickerInput onChange={setValues} values={values} />
          </div>

          <TextArea
            condition={formik.touched.address && formik.errors.address}
            error={formik.errors.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="آدرس را وارد نمایید..."
            id="address"
            rows={1}
            label="آدرس"
            name="address"
            className={`${
              formik.touched.address && formik.errors.address
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-blue-500"
            }`}
          />
        </form>
        <div className="flex flex-col items-center">
          <img
            className="rounded-3xl w-[20rem] md:w-[18rem] lg:w-[23rem]"
            src={checkoutImg}
            alt="checkout"
          />
          <OutlineButton
            className="mt-8"
            padding="px-20"
            bordercolorLight="border-orange-600"
            bordercolorDark="border-orange-700"
            textcolorLight="text-orange-400"
            textcolorDark="text-orange-500"
            onClick={formik.handleSubmit}
          >
            پرداخت
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
