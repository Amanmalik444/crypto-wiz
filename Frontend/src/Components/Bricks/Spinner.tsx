import * as React from "react";

interface IProps {
  color?: string;
  height?: string;
  className?: string;
}

const Spinner: React.FC<IProps> = ({
  color = "black",
  height = "2xl",
  className = "",
}) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <i
          className={`bx bx-loader-alt bx-spin text-${height} text-${color} ${className}`}
        />
      </div>

      {/* <div className="flex justify-center items-center">
        <p
          className="h-20 w-20 rounded-full animate-spin
          border-l-4 border-b border-gray-500"
        />
      </div> */}
    </>
  );
};

export default Spinner;
