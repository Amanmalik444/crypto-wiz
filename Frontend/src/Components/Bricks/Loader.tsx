import * as React from "react";

interface IProps {
  color?: string;
  size?: string;
  className?: string;
  width?: string;
}

const Loader: React.FC<IProps> = ({
  color = "gray-500",
  size = "3",
  className = "",
  width = "12",
}) => {
  return (
    <div
      className={`flex justify-center items-center h-full w-full ${className}`}
    >
      <div className={`flex justify-between h-${size} w-${width}`}>
        <span
          className={`h-${size} w-${size} rounded-full bg-${color} circle animate-loader`}
        />
        <span
          className={`h-${size} w-${size} rounded-full bg-${color} circle animate-loader animation-delay-200`}
        />
        <span
          className={`h-${size} w-${size} rounded-full bg-${color} circle animate-loader animation-delay-400`}
        />
      </div>
    </div>
  );
};

export default Loader;
