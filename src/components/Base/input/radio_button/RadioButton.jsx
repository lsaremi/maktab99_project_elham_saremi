export const RadioButton = ({ children, checked, onFilter, id }) => {
  return (
    <>
      <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
        <input
          className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-orange-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-orange-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-orange-500 checked:after:bg-orange-500 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-orange-500 checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#ca723b] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-orange-500 dark:checked:after:border-orange-500 dark:checked:after:bg-orange-500  dark:checked:focus:border-orange-500 "
          type="radio"
          name="inlineRadioOptions"
          id={id}
          value="option1"
          onChange={onFilter}
          checked={checked}
        />
        <label
          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer text-sm text-orange-100"
          htmlFor={id}
        >
          {children}
        </label>
      </div>
    </>
  );
};
