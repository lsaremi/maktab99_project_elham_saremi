export const NextPage = ({ currentPage, totalPages, onNextPage }) => {
  return (
    <li>
      <a
        className={`relative block rounded cursor-pointer ${
          currentPage === totalPages
            ? "text-neutral-400"
            : "bg-transparent text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-orange-500 dark:hover:text-orange-500"
        } px-4 py-1.5 text-lg rounded-full transition-all duration-300`}
        aria-label="Next"
        onClick={onNextPage}
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  );
};
