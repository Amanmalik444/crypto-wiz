import * as React from "react";

interface IProps {
  page: number;
  setPage: any;
  className?: string;
}

const InputPageNumber: React.FC<IProps> = ({ page = 1, setPage, className = "" }) => {
  return (
    <input
      className={`m-4 rounded-lg p-2 py-3 w-20 text-gray-800 
          border border-gray-300 text-center ${className}`}
      id="pageNumber"
      type="number"
      placeholder={"Page no."}
      value={page}
      min={1}
      onChange={(e) => setPage(Number(e.target.value) || 1)}
    />
  );
};

export default InputPageNumber;
