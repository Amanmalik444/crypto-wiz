import * as React from "react";

import { Loader } from "Components/Atoms";

interface IProps {
  bgc?: string;
  bgch?: string;
  color?: string;
  colorh?: string;
  outline?: boolean;
  disabled?: boolean;
  loading?: boolean;
  rounded?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: any;
  className?: string;
  withoutAnimation?: boolean;
}

const Button: React.FC<IProps> = ({
  bgc = "",
  bgch = "",
  color = "",
  colorh = "",
  outline = true,
  disabled = false,
  loading = false,
  rounded = "none",
  children = "Save",
  type = "button",
  onClick = () => {},
  className = "",
  withoutAnimation = false,
}) => {
  const [clickAnimation, setClickAnimation] = React.useState(false);
  return (
    <button
      type={type}
      className={`${outline && `border border-${bgch}`} bg-${
        disabled ? "gray-200" : bgc
      } text-${color} ${
        rounded && `rounded-${rounded}`
      } transition duration-200 ease select-none ${
        !disabled &&
        !loading &&
        `hover:text-${colorh} hover:bg-${
          disabled || loading ? "gray-200" : bgch
        }`
      } ${
        clickAnimation && !withoutAnimation && "animate-shrink"
      } focus:outline-none focus:shadow-outline ${
        (disabled || loading) && "cursor-auto text-opacity-75"
      } ${className}`}
      disabled={loading || disabled}
      onClick={() => {
        setClickAnimation(true);
        onClick();
      }}
      onAnimationEnd={() => setClickAnimation(false)}
    >
      {loading ? (
        <Loader size="2" width="8" color={color} className="mt-1" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
