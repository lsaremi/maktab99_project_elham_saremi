import { LuChevronLast } from "react-icons/lu";

export const FirstPage = ({ onFirstPage, currentPage }) => {
  return (
    <li>
      <a
        className={`relative block rounded cursor-pointer ${
          currentPage === 1
            ? "text-neutral-400"
            : "bg-transparent text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:text-orange-500 dark:hover:text-orange-500"
        } px-4 py-3 text-lg rounded-full transition-all duration-300`}
        aria-label="Go to First Page"
        onClick={onFirstPage}
      >
        <LuChevronLast />
      </a>
    </li>
  );
};
