import moment from "moment";
import { Connect } from "../../../../Components/Mansions";

import userImg from "../../../../utils/user.png";

interface IProps {
  coinsSaved?: number;
  followersNumber?: number;
}

const ProfileCard: React.FC<IProps> = ({
  coinsSaved = 0,
  followersNumber = 0,
}) => {
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
                <Connect defaultTab="Followers">
                  <i className="bx bxs-user-plus mr-2 text-xl cursor-pointer" />
                </Connect>
                <Connect defaultTab="Followers">
                  <p className="cursor-pointer">
                    {followersNumber}{" "}
                    {followersNumber > 1 ? "Followers" : "Follower"}
                  </p>
                </Connect>
              </div>
            </div>
            <div className="mr-2">
              <Connect defaultTab="Follow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
