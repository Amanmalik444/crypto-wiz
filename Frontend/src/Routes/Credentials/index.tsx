import * as React from "react";
import { Canvas } from "../../Components/Molecules/";
import Login from "./Components/LoginPage";
import Register from "./Components/RegistrationPage";

interface IState {
  pageToShow: string;
}

const Credentials = () => {
  const [pageToShow, setPageToShow] =
    React.useState<IState["pageToShow"]>("login");

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-900 ">
      {pageToShow === "login" ? (
        <Login setPageToShow={setPageToShow} />
      ) : (
        <Register setPageToShow={setPageToShow} />
      )}
      <div className="absolute">
        <Canvas />
      </div>
    </div>
  );
};

export default Credentials;
