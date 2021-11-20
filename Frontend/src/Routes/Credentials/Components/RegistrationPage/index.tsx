import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import logo from "../../../../utils/logo.gif";
import { Button } from "../../../../Components/Bricks";

interface IState {
  name: string;
  userName: string;
  password: string;
  loading: boolean;
}

interface IProps {
  setPageToShow: any;
}

const Register: React.FC<IProps> = ({ setPageToShow }) => {
  const [name, setName] = React.useState<IState["name"]>("");
  const [userName, setUserName] = React.useState<IState["userName"]>("");
  const [password, setPassword] = React.useState<IState["password"]>("");
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const history = useHistory();

  const Submit = (e: any) => {
    e.preventDefault();
    toast.loading("Registering", { id: "register" });
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_SERVER_LINK}/register/`, {
        name,
        userName,
        password,
      })
      .then((res) => {
        setLoading(false);
        toast.success(`Registered as ${name}`, { duration: 4000 });
        toast.dismiss("register");
        history.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data);
        toast.dismiss("register");
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <form
      className="z-50 absolute bg-black shadow-2xl rounded rounded-lg p-12 px-8 flex flex-col justify-center items-center "
      onSubmit={Submit}
    >
      <img className="h-12 w-auto mb-6" src={logo} alt="Crypto Wiz" />
      <div className="mb-4">
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Name
        </label>
        <input
          className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Username
        </label>
        <input
          className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          placeholder="Enter Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-200 text-sm font-bold mb-2">
          Password
        </label>
        <input
          className="w-64 shadow appearance-none border rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          placeholder="Enter Password"
          value={password}
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
          classes="w-64 h-8 bg-gray-800"
          loading={loading}
        >
          Register
        </Button>
      </div>
      <p
        className="font-light antialiased text-md cursor-pointer
        text-gray-400 hover:text-gray-200"
        onClick={() => {
          setPageToShow("login");
        }}
      >
        Already a user? Login
      </p>
    </form>
  );
};

export default Register;
