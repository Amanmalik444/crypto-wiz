import * as React from "react";
import moment from "moment";

import { Button } from "../../../../Components/Bricks";
import { ConnectModal } from "../../../../Components/Modals";
import { userImg } from "../../../../utils";

interface IProps {
  coinsSaved?: number;
  followersNumber?: number;
}

const ProfileCard: React.FC<IProps> = ({
  coinsSaved = 0,
  followersNumber = 0,
}) => {
  const [connectModalVisibile, setConnectModalVisibility] =
    React.useState<boolean>(false);
  const [defaultTab, setDefaultTab] = React.useState<string>("Follow");

  let element = document.getElementById("favouriteList");
  const user = JSON.parse(localStorage.getItem("user") as string);

  const scrollToFavourite = () => {
    element!.style.scrollMarginTop = "4rem";
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className="w-11/12 sm:w-10/12 md:w-4/5 lg:w-3/5 xl:w-1/2 2xl:w-2/5 flex flex-col
    bg-white bg-opacity-80 shadow-md rounded-3xl p-4 m-4"
    >
      <div className="flex-none sm:flex">
        <div className="relative h-32 w-32 sm:mb-0 mb-3">
          <img
            src={userImg}
            alt="aji"
            className="w-32 h-32 object-cover rounded-2xl border-2 border-gray-300"
          />
          <i
            className="bx bxs-edit-alt absolute -right-2 bottom-2 cursor-pointer
          text-lg text-gray-100 rounded-full bg-gray-600 px-1
          transition ease-in duration-200 hover:text-white hover:bg-gray-800"
          />
        </div>
        <div className="flex-auto sm:ml-5 justify-evenly">
          <div className="flex items-center justify-between sm:mt-2">
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="w-full flex-none text-lg text-gray-700 font-bold leading-none">
                  {user.name || "Name"}
                </div>
                <div className="flex-auto text-gray-500 my-1">
                  <span className="mr-3 ">{user.userName || "UserName"}</span>
                  <span className="mr-3 border-r border-gray-300 max-h-0"></span>
                  <span>India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex">
              <p className="w-full flex-none text-sm text-gray-400 leading-none">
                Joined {moment(user.createdAt).fromNow() || "recently"}
              </p>
            </div>
          </div>
          <div
            className="flex w-full justify-between items-center flex-wrap 
          pt-4 text-sm text-gray-600"
          >
            <div className="flex w-full md:w-2/3 justify-between items-center">
              <div className="flex-1 inline-flex items-center">
                <i
                  className="bx bxs-star mr-2 text-lg cursor-pointer"
                  onClick={scrollToFavourite}
                />
                <p className="cursor-pointer" onClick={scrollToFavourite}>
                  {coinsSaved} {coinsSaved > 1 ? "Favourites" : "Favourite"}
                </p>
              </div>
              <div className="flex-1 inline-flex items-center">
                <i
                  className="bx bxs-user-plus mr-2 text-xl cursor-pointer"
                  onClick={() => {
                    setDefaultTab("Followers");
                    setConnectModalVisibility(true);
                  }}
                />
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    setDefaultTab("Followers");
                    setConnectModalVisibility(true);
                  }}
                >
                  {followersNumber}{" "}
                  {followersNumber > 1 ? "Followers" : "Follower"}
                </p>
              </div>
            </div>
            <div className="mr-2">
              <Button
                rounded="lg"
                bgch="gray-800"
                bgc="white"
                color="gray-100"
                colorh="white"
                classes="w-28 h-8 bg-gray-600"
                onClick={() => {
                  setDefaultTab("Follow");
                  setConnectModalVisibility(true);
                }}
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ConnectModal
        openModal={connectModalVisibile}
        closeModal={() => {
          setConnectModalVisibility(false);
        }}
        defaultTab={defaultTab}
      />
    </div>
  );
};

export default ProfileCard;
