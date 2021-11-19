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
      <div className="flex justify-center items-center z-50">
        <i
          className={`bx bx-loader-alt bx-spin text-${height} text-${color} ${className}`}
        />
      </div>
    </>
  );
};

export default Spinner;
