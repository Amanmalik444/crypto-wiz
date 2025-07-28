import * as React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { REACT_APP_SERVER_LINK } from "utils";

interface IState {
  name: string;
  userName: string;
  password: string;
  loading: boolean;
}

const useData = () => {
  const [name, setName] = React.useState<IState["name"]>("");
  const [userName, setUserName] = React.useState<IState["userName"]>("");
  const [password, setPassword] = React.useState<IState["password"]>("");
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const [onLoginPage, setOnLoginPage] = React.useState<boolean>(true);
  const [animate, setAnimate] = React.useState<boolean>(false);
  const [profilePicIndex, setProfilePicIndex] = React.useState<
    number | undefined
  >(undefined);
  const [profilePicsModalVisibile, setProfilePicsModalVisibility] =
    React.useState<boolean>(false);
  const history = useHistory();

  const changeCredentialPage = () => {
    setAnimate(true);
    setName("");
    setUserName("");
    setPassword("");
    setProfilePicIndex(undefined);
    setOnLoginPage(!onLoginPage);
  };

  const skipLogin = () => {
    toast.success("Logged in as a Guest", { duration: 4000 });
    localStorage.setItem("jwt", "");
    localStorage.setItem("user", "");
    history.push("/market");
  };

  const onProfilePicClick = (index: number) => {
    setProfilePicIndex(index);
    setProfilePicsModalVisibility(false);
  };

  const RegisterSubmit = (e: any) => {
    e.preventDefault();
    toast.loading("Registering", { id: "register" });
    setLoading(true);
    axios
      .post(`${REACT_APP_SERVER_LINK}/credentials/register/`, {
        name,
        userName,
        password,
        profilePicIndex,
      })
      .then(() => {
        setLoading(false);
        toast.success(`Registered as ${name}`, { duration: 4000 });
        toast.dismiss("register");
        changeCredentialPage();
      })
      .catch((err) => {
        toast.error((err && err.response?.data) || "An error occurred");
        toast.dismiss("register");
        setLoading(false);
        console.log(err);
      });
  };

  const LogInSubmit = (e: any) => {
    e.preventDefault();
    toast.loading("Logging In", { id: "login" });
    setLoading(true);
    axios
      .post(`${REACT_APP_SERVER_LINK}/credentials/login/`, {
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

  const states = {
    name,
    userName,
    password,
    loading,
    onLoginPage,
    animate,
    profilePicsModalVisibile,
    profilePicIndex,
  };

  return {
    states,
    RegisterSubmit,
    setName,
    setUserName,
    setPassword,
    LogInSubmit,
    setOnLoginPage,
    setAnimate,
    changeCredentialPage,
    skipLogin,
    onProfilePicClick,
    setProfilePicsModalVisibility,
  };
};

export default useData;
