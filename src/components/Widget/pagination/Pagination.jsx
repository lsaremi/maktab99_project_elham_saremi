import { useState, useEffect } from "react";
import { NextPage, PerPage, PrevPage } from "../../Base";

export const Pagination = ({
  totalPages,
  total,
  TRowsPerPage,
  currentPage,
  onPageChange,
}) => {
  const itemsPerPage = 3;
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    updateDisplayedPages();
  }, [currentPage, totalPages]);

  const updateDisplayedPages = () => {
    const newStart = Math.max(currentPage - Math.floor(itemsPerPage / 2), 1);
    const newDisplayedPages = Array.from(
      { length: Math.min(itemsPerPage, totalPages - newStart + 1) },
      (_, index) => newStart + index
    );
    setDisplayedPages(newDisplayedPages);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      {total >= TRowsPerPage && (
        <nav
          className="flex items-center justify-center"
          aria-label="Page navigation"
        >
          <ul className="list-style-none flex">
            <PrevPage currentPage={currentPage} onPrevPage={handlePrevClick} />
            {displayedPages.map((page) => (
              <PerPage
                key={page}
                page={page}
                label={page}
                onPageChange={onPageChange}
                currentPage={currentPage}
              />
            ))}

            <NextPage
              currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={handleNextClick}
            />
          </ul>
        </nav>
      )}
    </>
  );
};

// const makeAnArray = () => {
//   let ArrayOfNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     ArrayOfNumbers.push(i);
//   }
//   return ArrayOfNumbers;
// };
