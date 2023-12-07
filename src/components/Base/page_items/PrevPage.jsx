export const PrevPage = ({ currentPage, onPrevPage }) => {
  return (
    <li>
      <a
        className={`relative block rounded cursor-pointer ${
          currentPage === 1
            ? "text-neutral-400"
            : "bg-transparent text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-orange-500 dark:hover:text-orange-500"
        } px-4 py-1.5 text-lg rounded-full transition-all duration-300`}
        aria-label="Previous"
        onClick={onPrevPage}
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  );
};
