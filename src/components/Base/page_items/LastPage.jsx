import { BiFirstPage } from "react-icons/bi";

export const LastPage = ({ onLastPage, currentPage, totalPages }) => {
  return (
    <li>
      <a
        className={`relative block rounded cursor-pointer ${
          currentPage === totalPages
            ? "text-neutral-400"
            : "bg-transparent text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-orange-500 dark:hover:text-orange-500"
        } px-4 py-3 text-lg rounded-full transition-all duration-300`}
        aria-label="Go to Last Page"
        onClick={onLastPage}
      >
        <BiFirstPage />
      </a>
    </li>
  );
};
