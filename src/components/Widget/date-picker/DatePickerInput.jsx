import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import weekends from "react-multi-date-picker/plugins/highlight_weekends";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import size from "react-element-popper/animations/size";
import "react-multi-date-picker/styles/layouts/mobile.css";

export const DatePickerInput = ({ values, onChange }) => {
  return (
    <div style={{ direction: "rtl" }}>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        highlightToday={false}
        onOpenPickNewDate={false}
        required
        calendarPosition="bottom-right"
        inputClass={`custom-input`}
        placeholder="تاریخ تحویل را وارد نمایید ..."
        className={`green text-green bg-dark`}
        animations={[size()]}
        plugins={[weekends()]}
        value={values}
        onChange={onChange}
        range
        minDate={new DateObject().subtract(0, "days")}
        maxDate={new DateObject().add(6, "days")}
      />
    </div>
  );
};
