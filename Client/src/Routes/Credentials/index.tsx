import { Redirect } from "react-router-dom";

import { Button } from "Components/Atoms";
import { staticLogo, profilePics } from "utils";
import useData from "Routes/Credentials/data";
import { ProfilePicsModal } from "Modals";

const Credentials = () => {
  const {
    states,
    RegisterSubmit,
    LogInSubmit,
    setName,
    setUserName,
    setPassword,
    setAnimate,
    changeCredentialPage,
    skipLogin,
    onProfilePicClick,
    setProfilePicsModalVisibility,
  } = useData();

  const {
    name,
    userName,
    password,
    loading,
    onLoginPage,
    animate,
    profilePicsModalVisibile,
    profilePicIndex,
  } = states;

  if (localStorage.getItem("jwt")) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div
      className="h-screen w-full flex justify-center items-center 
      bg-gradient-to-r from-purple-600 to-red-600 animate-gradient"
    >
      <form
        className={`bg-white shadow-2xl rounded-lg bg-opacity-10
          z-50 p-12 px-8 flex flex-col justify-center items-center
          transition-all duration-300 ease-in transform
          ${animate && "animate-flip"}`}
        onSubmit={onLoginPage ? LogInSubmit : RegisterSubmit}
        onAnimationEnd={() => {
          setAnimate(false);
        }}
      >
        <img className="h-24 w-auto mb-6" src={staticLogo} alt="Crypto Wiz" />
        {!onLoginPage && (
          <div
            className="mb-3 text-center w-64 shadow rounded cursor-pointer
            h-11 px-2 bg-gray-200 text-white bg-opacity-20
            flex flex-row items-center justify-center"
            onClick={() => {
              setProfilePicsModalVisibility(true);
            }}
          >
            {profilePicIndex !== undefined && (
              <div
                style={{
                  backgroundImage: `url(${profilePics[profilePicIndex]})`,
                }}
                className="h-8 w-8 rounded-full mr-2 cursor-pointer
                ring-1 ring-yellow-100 ring-inset bg-cover"
              />
            )}
            <p>Choose your profile Picture</p>
          </div>
        )}
        {!onLoginPage && (
          <div className="mb-3">
            <label className="block text-gray-100 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="w-64 shadow rounded py-2 px-3 bg-gray-200 placeholder-gray-300
            transition-all duration-500 outline-none ring-gray-100 ring-opacity-40 text-white bg-opacity-20
            focus:ring-4 focus:text-white focus:bg-opacity-30 focus:placeholder-gray-100"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className={onLoginPage ? "mb-6" : "mb-3"}>
          <label className="block text-gray-200 text-sm font-bold mb-2">
            Username
          </label>
          <input
            className="w-64 shadow rounded py-2 px-3 bg-gray-200 placeholder-gray-300
            transition-all duration-500 outline-none ring-gray-100 ring-opacity-40 text-white bg-opacity-20
            focus:ring-4 focus:text-white focus:bg-opacity-30 focus:placeholder-gray-100"
            id="username"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-gray-100 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="w-64 shadow rounded py-2 px-3 bg-gray-200 placeholder-gray-300
            transition-all duration-500 outline-none ring-gray-100 ring-opacity-40 text-white bg-opacity-20
            focus:ring-4 focus:text-white focus:bg-opacity-30 focus:placeholder-gray-100"
            id="password"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <Button
            type="submit"
            rounded="md"
            bgch="gray-700"
            bgc="gray-800"
            color="gray-200"
            colorh="white"
            className="w-64 h-10"
            loading={loading}
          >
            {onLoginPage ? "Sign In" : "Register"}
          </Button>
        </div>
        <div className="w-64 flex justify-between items-center">
          <Button
            rounded="md"
            bgch="gray-700"
            bgc="gray-800"
            color="gray-200"
            colorh="white"
            className="px-2 py-1"
            onClick={skipLogin}
          >
            Skip Login
          </Button>
          <p
            className="font-light text-md cursor-pointer
            text-white hover:text-gray-200 underline"
            onClick={changeCredentialPage}
          >
            {onLoginPage ? "New user? Register" : "Already a user? Login"}
          </p>
        </div>
      </form>
      <ProfilePicsModal
        openModal={profilePicsModalVisibile}
        toggleModal={() => {
          setProfilePicsModalVisibility(false);
        }}
        modalHeader="Choose your profile picture"
        onProfilePicClick={onProfilePicClick}
        current={profilePicIndex}
      />
    </div>
  );
};

export default Credentials;
