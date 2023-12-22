export const TextInput = ({
  name,
  onChange,
  value,
  label,
  type,
  className,
  onBlur,
  condition,
  error,
}) => {
  return (
    <div className="mb-4 w-full text-right">
      <label
        className="block text-orange-300 text-sm font-bold mb-2"
        htmlFor={name}
      >
        <div className="flex items-center gap-4">
          {label} :
          {condition ? (
            <div className="text-xs text-red-500">{error}</div>
          ) : null}
        </div>
      </label>

      <input
        className={`${className}shadow focus:border-primary placeholder:text-orange-200 bg-transparent appearance-none border border-neutral-600 rounded w-full py-2 px-3 text-orange-200 leading-tight focus:outline-none autofill:bg-yellow-200`}
        id={name}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        placeholder={label}
        autoComplete="off"
        min="0"
      />
    </div>
  );
};
