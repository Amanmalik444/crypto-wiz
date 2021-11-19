import * as React from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useHistory, useLocation, NavLink } from "react-router-dom";

import logo from "../../../utils/logo.gif";
import user from "../../../utils/user.png";
import CurrencySelector from "./Components/CurrencySelector";
import useData from "./data";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

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
      name: "News",
      href: "/news",
      current: location.pathname === "/news",
    },
  ];

  const { Logout, states } = useData(history);
  const { status } = states;

  const logStatus = localStorage.getItem("jwt") ? "Log Out" : "Log In";

  return (
    <div className="fixed w-screen z-20">
      <Disclosure as="nav" className="bg-black">
        {({ open }: { open: boolean }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 
                  rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none 
                  focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src={logo}
                      alt="Crypto Wiz"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto mb-1"
                      src={logo}
                      alt="Crypto Wiz"
                    />
                  </div>
                  <div className="hidden sm:flex flex-row justify-center items-center ml-4">
                    <div>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium ml-2 transition duration-300 ease-out"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                    <div className="ml-4 mr-4 w-px h-8 bg-gray-800 rounded rounded-lg" />
                    <CurrencySelector />
                    <div className="ml-4 text-gray-300 hover:bg-gray-950 hover:text-white rounded-md text-sm font-medium">
                      <span>Status : {status}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }: { open: boolean }) => (
                      <>
                        <div>
                          <Menu.Button
                            className="bg-gray-800 flex text-sm rounded-full 
                          outline-none ring-2 ring-gray-500"
                          >
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={React.Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }: any) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }: any) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item onClick={Logout}>
                              {({ active }: any) => (
                                <a
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                >
                                  {logStatus}
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="text-gray-300 hover:bg-gray-950 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <span>Status : {status}</span>
                </div>
                <div className="px-3 py-2">
                  <CurrencySelector />
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
