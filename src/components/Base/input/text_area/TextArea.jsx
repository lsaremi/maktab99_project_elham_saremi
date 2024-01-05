export const TextArea = ({
  name,
  rows,
  onChange,
  value,
  label,
  placeholder,
  className,
  onBlur,
  condition,
  error,
}) => {
  return (
    <div className="mb-4 w-full text-right">
      <label
        htmlFor={name}
        className="text-orange-300 text-sm font-bold mb-2 flex items-start text-start"
      >
        <div className="flex  gap-4">
          {label} :
          {condition ? (
            <div className="text-xs text-red-500">{error}</div>
          ) : null}
        </div>
      </label>
      <textarea
        id={name}
        rows={rows}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        className={`block px-3 shadow text-orange-200 p-2.5 w-full rounded-lg border focus:ring-blue-500 focus:border-primary dark:bg-transparent border-neutral-600 dark:placeholder:text-neutral-600 dark:focus:ring-blue-500 dark:focus:border-primary ${className}`}
      ></textarea>
    </div>
  );
};
