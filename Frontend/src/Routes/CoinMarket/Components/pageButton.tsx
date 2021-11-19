import * as React from "react";
import toast from "react-hot-toast";

import PageNumberIndicator from "./pageNumberIndicator";

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
      className={`w-full p-4 flex items-center justify-between border-gray-200 sm:px-6 ${className}`}
    >
      <div className="flex-1 flex justify-between items-center sm:hidden">
        <p
          onClick={previous}
          className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </p>
        <p className="text-gray-500 text-md font-medium">Page {page}</p>
        <p
          onClick={next}
          className="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </p>
      </div>
      <div className="hidden sm:flex-1 sm:flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing <b>{(page - 1) * 24 + 1}</b> to <b>{page * 24}</b> of{" "}
          <b>4,750</b> results
        </p>
        <nav
          className="cursor-pointer bg-white relative z-0 inline-flex rounded-md shadow-sm -space-x-px text-gray-500 text-sm font-medium"
          aria-label="Pagination"
        >
          <i
            onClick={previous}
            className="bx bx-chevron-left text-2xl p-2 rounded-l-md border border-gray-300 bg-white hover:bg-gray-100"
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 1}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 2}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 3}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 4}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 5}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 6}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 7}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 8}
            setPage={setPage}
          />
          <PageNumberIndicator
            page={page}
            numberToShow={pageRangeStart + 9}
            setPage={setPage}
          />

          <i
            onClick={next}
            className="bx bx-chevron-right text-2xl p-2 rounded-r-md border border-gray-300 bg-white hover:bg-gray-100"
          />
        </nav>
      </div>
    </div>
  );
};

export default Filters;
