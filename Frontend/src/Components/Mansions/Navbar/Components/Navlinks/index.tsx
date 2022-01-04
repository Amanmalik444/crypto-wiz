import * as React from "react";
import { useLocation, NavLink } from "react-router-dom";

interface IProps {
  className?: string;
}

const Navlinks: React.FC<IProps> = ({ className = "" }) => {
  const location = useLocation();
  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      current: location.pathname === "/dashboard",
    },
    {
      name: "Coin Market",
      href: "/market",
      current: location.pathname === "/market",
    },
    {
      name: "Status Updates",
      href: "/statusUpdates",
      current: location.pathname === "/statusUpdates",
    },
  ];

  return (
    <>
      {navigation.map((item) => (
        <NavLink
          to={item.href}
          key={item.name}
          className={`${
            item.current
              ? "bg-gray-800 text-white border-gray-700"
              : "text-gray-300 hover:bg-gray-700 hover:text-white border-gray-900"
          }
          border px-3 py-2 rounded-md text-sm font-medium ml-2 transition duration-300 ease-out
            ${className}`}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );
};

export default Navlinks;
