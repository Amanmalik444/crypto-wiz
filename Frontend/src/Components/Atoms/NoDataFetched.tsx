import * as React from "react";

interface IProps {
  onClickNoData?: () => void;
  className?: string;
  errorMessage: string;
}

const NoDataFetched: React.FC<IProps> = ({
  onClickNoData = () => {},
  className = "",
  errorMessage = "",
}) => {
  return (
    <div
      className={`py-16 my-2 flex flex-col items-center text-xl ${className}`}
    >
      <i
        className={`bx bx-x-circle m-5 text-6xl transition text-red-500
            duration-1000 transform -rotate-180 hover:-translate-y-3
            hover:scale-150 hover:rotate-180 cursor-pointer`}
        onClick={onClickNoData}
      />
      <p className="cursor-default font-semibold text-gray-500">
        {errorMessage}
      </p>
    </div>
  );
};

export default NoDataFetched;
