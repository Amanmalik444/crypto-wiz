import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Redirect, NavLink } from "react-router-dom";
import toast from "react-hot-toast";

import { logo } from "../../../../utils";
import { Button } from "../../../../Components/Bricks";

interface IState {
  userName: string;
  password: string;
  loading: boolean;
}

interface IProps {
  setPageToShow?: any;
}

const Login: React.FC<IProps> = ({ setPageToShow }) => {
  const [userName, setUserName] = React.useState<IState["userName"]>("");
  const [password, setPassword] = React.useState<IState["password"]>("");
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const history = useHistory();

  if (localStorage.getItem("jwt")) {
    return <Redirect to="/dashboard" />;
  }

  const Submit = (e: any) => {
    e.preventDefault();
    toast.loading("Logging In", { id: "login" });
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_LINK}/login/`, {
        userName,
        password,
      })
      .then((res: any) => {
        toast.success(`Welcome ${res.data.user.name}`, { duration: 4000 });
        toast.dismiss("login");
        setLoading(false);
        localStorage.setItem("jwt", JSON.stringify(res.data.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        history.push("/");
      })
      .catch((err) => {
        toast.error((err && err.response?.data) || "An error occurred");
        toast.dismiss("login");
        setLoading(false);
      });
  };

  return (
    <form
      className="z-50 absolute bg-black shadow-2xl rounded rounded-lg p-12 px-8 
      flex flex-col justify-center items-center "
      onSubmit={Submit}
    >
      <img className="h-12 w-auto mb-6" src={logo} alt="Crypto Wiz" />
      <div className="mb-4">
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Username
        </label>
        <input
          className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800"
          id="username"
          placeholder="Enter Username"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Password
        </label>
        <input
          className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800"
          id="password"
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <Button
          type="submit"
          rounded="md"
          bgch="gray-600"
          bgc="white"
          color="white"
          colorh="white"
          className="w-64 h-8 bg-gray-800"
          loading={loading}
        >
          Sign In
        </Button>
      </div>
      <div className="grid gap-x-0 grid-cols-2">
        <p>
          <NavLink
            className="font-light antialiased text-md
              text-gray-400 hover:text-gray-200
              bg-black rounded-lg py-1 px-2 transition duration-200
              border border-gray-700 hover:bg-gray-700 hover:text-white"
            to="/market"
            onClick={() => {
              toast.success("Logged in as a Guest", { duration: 4000 });
              localStorage.setItem("jwt", "");
              localStorage.setItem("user", "");
            }}
          >
            Skip Login
          </NavLink>
        </p>
        <p>
          <p
            className="font-light antialiased text-md cursor-pointer
            text-gray-400 hover:text-gray-200"
            onClick={() => {
              setPageToShow("register");
            }}
          >
            New user? Register
          </p>
        </p>
      </div>
    </form>
  );
};

export default Login;
