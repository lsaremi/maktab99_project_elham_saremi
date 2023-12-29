import { useFormik } from "formik";
import * as Yup from "yup";
import checkoutImg from "../assets/images/checkoutImg.jpeg";
import { OutlineButton, TextArea, TextInput } from "../components";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import size from "react-element-popper/animations/size";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveDate } from "../features/date/dateSlice";

const CheckOut = () => {
  const [values, setValues] = useState([
    new DateObject(),
    new DateObject().add(2, "day"),
  ]);

  // const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("وارد کردن نام الزامی است"),
    lastName: Yup.string().trim().required("وارد کردن نام خانوادگی الزامی است"),
    address: Yup.string().trim().required("وارد کردن آدرس الزامی است"),
    phone: Yup.string()
      .trim()
      .matches(/^09[0|1|2|3][0-9]{8}$/, "شماره همراه معتبر وارد کنید")
      .required("وارد کردن تلفن همراه الزامی است"),
    // deliveryDate: Yup.date().required("وارد کردن تاریخ تحویل الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      address: "",
      phone: "",
      // deliveryDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // onAdd(values);
      console.log(values);
      formik.resetForm();
      handlePayment();
    },
  });

  const handlePayment = () => {
    window.location.assign(`http://localhost:3001`);
  };

  // const handleDatePickerChange = (value) => {
  //   formik.setFieldValue("deliveryDate", value);
  //   dispatch(saveDate(formik.values.deliveryDate?.toString()));
  //   // dispatch(saveDate(formik.values.deliveryDate?.getTime()));
  //   console.log(formik.values.deliveryDate);

  //   if (formik.errors.deliveryDate) {
  //     formik.setFieldError("deliveryDate", "");
  //   }
  // };
  return (
    <div className="flex flex-col w-4/5 mt-28 mx-auto gap-5">
      <h3 className="text-lg leading-6 font-bold text-right text-green-500">
        نهایی کردن سبد خرید
      </h3>
      <div className="flex px-20 items-center gap-32 w-full  mx-auto">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center justify-between flex-1"
        >
          <TextInput
            condition={formik.touched.name && formik.errors.name}
            error={formik.errors.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="نام را وارد نمایید..."
            label="نام"
            name="name"
            id="name"
            type="text"
            className={`${
              formik.touched.name && formik.errors.name
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-blue-500"
            }`}
          />

          <TextInput
            condition={formik.touched.lastName && formik.errors.lastName}
            error={formik.errors.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            label=" نام خانوادگی "
            placeholder="نام خانوادگی را وارد نمایید..."
            name="lastName"
            id="lastName"
            type="text"
            className={`${
              formik.touched.lastName && formik.errors.lastName
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-blue-500"
            }`}
          />
          <TextInput
            condition={formik.touched.phone && formik.errors.phone}
            error={formik.errors.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            placeholder="تلفن همراه را وارد نمایید..."
            label="تلفن همراه "
            name="phone"
            id="phone"
            type="text"
            className={`${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500 focus:outline-none focus:border-red-500"
                : "focus:outline-none focus:border-blue-500"
            }`}
          />

          <div className="mb-4 w-full text-right">
            <label className="text-orange-300 mb-2 flex items-center gap-4">
              تاریخ تحویل :
            </label>

            <div style={{ direction: "rtl" }}>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                highlightToday={false}
                onOpenPickNewDate={false}
                required
                calendarPosition="bottom-right"
                // inputClass="custom-input"
                inputClass={`custom-input ${
                  formik.touched.deliveryDate && formik.errors.deliveryDate
                    ? "border-red-500 focus:outline-none focus:border-red-500"
                    : "focus:outline-none focus:border-blue-500"
                }`}
                placeholder="تاریخ تحویل را وارد نمایید ..."
                className={`green text-green bg-dark`}
                animations={[size()]}
                plugins={[weekends()]}
                value={values}
                onChange={setValues}
                range
                minDate={new DateObject().subtract(0, "days")}
                maxDate={new DateObject().add(6, "days")}
              />
            </div>
          </div>

          <TextArea
            condition={formik.touched.address && formik.errors.address}
            error={formik.errors.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="آدرس را وارد نمایید..."
            id="address"
            rows={3}
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
            className="rounded-3xl w-[23rem]"
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
