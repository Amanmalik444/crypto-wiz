import * as React from "react";

interface IProps {
  first?: string;
  second?: string;
  className?: string;
  secondFont?: string;
}

const TextData: React.FC<IProps> = ({
  first = "",
  second = "",
  className = "",
  secondFont = "medium",
}) => {
  return (
    <div
      className={`pt-3 flex flex-col items-center justify-center ml-3 mr-3 ${className}`}
    >
      <p className="text-xs font-small">{first}</p>
      <p className={`text-xl font-${secondFont}`}>{second}</p>
    </div>
  );
};

export default TextData;
