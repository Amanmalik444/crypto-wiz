import * as React from "react";

import { profilePics } from "utils";

interface IProps {
  followingUsers:
    | {
        userId: {
          name: string;
          userName: string;
          profilePicIndex: number | string;
          _id: string;
        };
      }[]
    | undefined;
  selectedUserIds: string[];
  setSelectedUserIds: React.Dispatch<React.SetStateAction<string[]>>;
  sendCoinsWithinApp: () => void;
}

const SendCoinsToFollowingUsers: React.FC<IProps> = ({
  followingUsers,
  selectedUserIds,
  setSelectedUserIds,
  sendCoinsWithinApp,
}) => {
  const followingUserClicked = (id: string) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(
        selectedUserIds.filter((selectedId: string) => selectedId !== id)
      );
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center gap-4 py-2">
        <div
          className="flex flex-row justify-start items-center 
        overflow-auto gap-2"
        >
          {followingUsers?.map((user) => (
            <>
              <div
                className={`flex flex-col justify-center items-center 
              border-2 p-2 rounded-lg cursor-pointer ${
                selectedUserIds.includes(user.userId._id)
                  ? " border-blue-400 bg-blue-200"
                  : " border-gray-300  bg-gray-100"
              }`}
                onClick={() => {
                  followingUserClicked(user.userId._id);
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${
                      profilePics[Number(user.userId.profilePicIndex) || 0]
                    })`,
                  }}
                  className="w-16 h-16 rounded-full
                ring-4 ring-yellow-100 ring-inset bg-cover"
                />
                <p className="text-sm truncate">{user.userId.name}</p>
                <p className="text-xs">{user.userId.userName}</p>
              </div>
            </>
          ))}
        </div>

        <i
          className={`bx bx-send text-4xl transition duration-300 ${
            selectedUserIds.length > 0
              ? "text-blue-500 cursor-pointer"
              : "text-gray-300"
          }`}
          onClick={() => {
            if (selectedUserIds.length > 0) {
              sendCoinsWithinApp();
            }
          }}
        />
      </div>
    </>
  );
};

export default SendCoinsToFollowingUsers;
