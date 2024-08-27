import * as React from "react";
import toast from "react-hot-toast";

import PageNumberIndicator from "Components/Mansions/Pagination/pageNumberIndicator";
import InputPageNumber from "Components/Mansions/Pagination/inputPageNumber";

interface IProps {
  setPage: any;
  page: number;
  className?: string;
}

const Filters: React.FC<IProps> = ({ setPage, page = 1, className = "" }) => {
  let pageRangeStart =
    page % 10 !== 0
      ? Math.trunc(page / 10) * 10 + 1
      : Math.trunc(page / 10 - 1) * 10 + 1;
  const previous = () => {
    page > 1 ? setPage(page - 1) : toast.error("Choose a valid page");
  };

  const next = () => {
    setPage(page + 1);
  };
  return (
    <div
      className={`w-full p-4 flex items-center justify-between 
      border-gray-200 md:px-6 ${className}`}
    >
      <div className="text-sm font-medium text-gray-700 flex-1 flex justify-between items-center md:hidden">
        <p
          onClick={previous}
          className="cursor-pointer bg-white hover:bg-gray-100 rounded-lg
          px-4 py-2 border border-gray-300 hover:border-gray-400"
        >
          Previous
        </p>
        <InputPageNumber page={page} setPage={setPage} />
        <p
          onClick={next}
          className="cursor-pointer bg-white hover:bg-gray-100 rounded-lg
          px-4 py-2 border border-gray-300 hover:border-gray-400"
        >
          Next
        </p>
      </div>
      <div className="hidden md:flex-1 md:flex flex-wrap items-end justify-end">
        <InputPageNumber page={page} setPage={setPage} />
        <div
          className="cursor-pointer bg-white relative flex flex-row
          rounded-md shadow-sm -space-x-px text-gray-500 text-sm font-medium m-4"
          aria-label="Pagination"
        >
          <i
            onClick={() => {
              page > 10
                ? setPage(page - 10)
                : toast.error("Choose a valid page");
            }}
            className="bx bx-chevrons-left text-2xl p-2 rounded-l-md border 
            border-gray-300 hover:bg-gray-100"
          />
          <i
            onClick={previous}
            className="bx bx-chevron-left text-2xl p-2 border 
            border-gray-300 hover:bg-gray-100"
          />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((ind) => (
            <PageNumberIndicator
              page={page}
              numberToShow={pageRangeStart + ind}
              setPage={setPage}
            />
          ))}

          <i
            onClick={next}
            className="bx bx-chevron-right text-2xl p-2
            border border-gray-300 hover:bg-gray-100"
          />
          <i
            onClick={() => {
              setPage(page + 10);
            }}
            className="bx bx-chevrons-right text-2xl p-2 rounded-r-md 
            border border-gray-300 hover:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
