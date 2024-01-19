export const PerPage = ({ page, label, currentPage, onPageChange }) => {
  return (
    <li
      key={page}
      className={`${
        currentPage === page
          ? "text-orange-200"
          : "bg-transparent text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-orange-500 dark:hover:text-orange-500"
      } relative block cursor-pointer rounded-full px-4 py-1.5 text-lg transition-all duration-300`}
    >
      <button onClick={() => onPageChange(page)} aria-label={`Page ${label}`}>
        {label}
      </button>
    </li>
  );
};
