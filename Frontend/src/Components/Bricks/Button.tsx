import * as React from "react";

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
  bgc = "white",
  bgch = "gray-800",
  color = "gray-700",
  colorh = "white",
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
        disabled || loading ? "gray-200" : bgc
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
      {loading && <i className="bx bx-loader-alt bx-spin mr-2" />}
      {children}
    </button>
  );
};

export default Button;
