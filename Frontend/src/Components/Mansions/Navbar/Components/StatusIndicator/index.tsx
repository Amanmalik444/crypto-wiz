import * as React from "react";

interface IProps {
  status: "Online" | "Offline" | "Connecting!";
  className?: string;
}

const StatusIndicator: React.FC<IProps> = ({ status, className }) => {
  return (
    <>
      <div
        className={`flex flex-row justify-center items-center px-4 py-2 text-sm
        rounded-md cursor-default font-medium border border-${
          status === "Online"
            ? "green-800"
            : status === "Offline"
            ? "red-600"
            : "gray-600"
        } text-gray-300 gap-2 ${className}`}
      >
        <div
          className={`p-1 bg-${
            status === "Online"
              ? "green"
              : status === "Offline"
              ? "red"
              : "gray"
          }-500 border-2 border-${
            status === "Online"
              ? "green"
              : status === "Offline"
              ? "red"
              : "gray"
          }-600 rounded-full`}
        />
        {status}
      </div>
    </>
  );
};

export default StatusIndicator;
