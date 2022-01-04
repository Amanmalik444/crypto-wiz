import * as React from "react";

interface IProps {
  tooltipLabel?: string;
  className?: string;
}

const Tooltip: React.FC<IProps> = ({
  children,
  tooltipLabel,
  className = "relative",
}) => {
  const [isTooltipVisible, setTooltipVisibility] =
    React.useState<boolean>(false);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`flex flex-col items-center
          absolute transition-all duration-300 bottom-5
          ${
            isTooltipVisible
              ? "visible opacity-100 mb-4"
              : "invisible opacity-0 mb-1"
          }`}
        onMouseEnter={() => {
          setTooltipVisibility(true);
        }}
        onMouseLeave={() => {
          setTooltipVisibility(false);
        }}
      >
        <div
          className="absolute -bottom-0 bg-gray-700
            h-3 w-3 transform rotate-45"
        />
        <div
          className="absolute bg-gray-700 text-white py-1 px-2 rounded-lg
            text-center text-sm font-medium whitespace-nowrap bottom-1"
        >
          {tooltipLabel || "Tooltip"}
        </div>
      </div>
      <div
        onMouseEnter={() => {
          setTooltipVisibility(true);
        }}
        onMouseLeave={() => {
          setTooltipVisibility(false);
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
