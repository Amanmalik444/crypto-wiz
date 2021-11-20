import * as React from "react";
import { Canvas } from "../../Components/Mansions";
import Login from "./Components/LoginPage";
import Register from "./Components/RegistrationPage";

const Credentials = () => {
  const [pageToShow, setPageToShow] = React.useState<string>("login");

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
