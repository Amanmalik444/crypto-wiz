import * as React from "react";

interface IProps {
  page: number;
  numberToShow: number;
  setPage: any;
}

const PageNumberIndicator: React.FC<IProps> = ({ page = 1, numberToShow = 1, setPage }) => {
  return (
    <p
      onClick={() => {
        setPage(numberToShow);
      }}
      className={`relative inline-flex items-center px-4 py-2 ${
        page === numberToShow
          ? "border-t border-b px-5 border-indigo-500 bg-indigo-200 bg-opacity-60 hover:bg-opacity-90 text-indigo-800"
          : "border border-gray-300 hover:bg-gray-100"
      }`}
    >
      {numberToShow}
    </p>
  );
};

export default PageNumberIndicator;
