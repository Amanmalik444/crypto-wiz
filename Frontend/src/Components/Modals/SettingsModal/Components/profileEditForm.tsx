import * as React from "react";
import toast from "react-hot-toast";
import axios from "axios";

import { Spinner, Button } from "../../../Bricks";

interface IProps {
  goBack?: () => void;
  useCase?: string;
}

const SettingsModal: React.FC<IProps> = ({
  goBack = () => {},
  useCase = "",
}) => {
  const [name, setName] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [currPassword, setCurrPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const user = JSON.parse(localStorage.getItem("user") as string) || "";

  const updateProfileClicked = (e: any) => {
    e.preventDefault();
    if (
      (!name && !userName) ||
      (name === user.name && userName === user.userName)
    ) {
      toast.error("Nothing to update");
    } else if (!currPassword) {
      toast.error("Please enter your current password");
    } else {
      const updatedProfileBody = {
        userId: user._id,
        name: name ? name : user.name,
        userName: userName ? userName : user.userName,
        currPassword,
      };
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_SERVER_LINK}/profile/updateUser`,
          { updatedProfileBody },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("jwt") as string),
            },
          }
        )
        .then((res: any) => {
          toast.success(res?.data?.status || "Updated");
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setLoading(false);
        })
        .catch(() => {
          toast.error("An error occured");
          setLoading(false);
        });
    }
  };

  const changePasswordClicked = (e: any) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Nothing to update");
    } else if (!currPassword) {
      toast.error("Please enter your current password");
    } else {
      const updatedProfileBody = {
        userId: user._id,
        newPassword,
        currPassword,
      };
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_SERVER_LINK}/profile/updateUser`,
          { updatedProfileBody },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("jwt") as string),
            },
          }
        )
        .then((res: any) => {
          toast.success(res?.data?.status || "Updated");
          setLoading(false);
        })
        .catch(() => {
          toast.error("An error occured");
          setLoading(false);
        });
    }
  };

  return (
    <>
      <form
        className="flex flex-col flex-stretch justify-center items-center"
        onSubmit={
          useCase === "updateProfile"
            ? updateProfileClicked
            : changePasswordClicked
        }
      >
        {useCase === "updateProfile" ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1 ml-2">
                New Name
              </label>
              <input
                className="w-64 border rounded py-2 px-4 text-gray-800"
                id="username"
                placeholder={user.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold mb-1 ml-2">
                New Username
              </label>
              <input
                className="w-64 border rounded py-2 px-4 text-gray-800"
                id="username"
                placeholder={user.userName}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1 ml-2">
                New Password
              </label>
              <input
                className="w-64 border rounded py-2 px-4 text-gray-800"
                id="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-1 ml-2">
            Current Password
          </label>
          <input
            className="w-64 border rounded py-2 px-4 text-gray-800"
            id="password"
            placeholder="Enter password to verify"
            value={currPassword}
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </div>
        <div className="flex-row items-center justify-between mb-4">
          <Button
            rounded="md"
            bgch="red-400"
            bgc="white"
            color="white"
            colorh="white"
            classes="w-20 h-8 bg-red-500 text-center"
            disabled={loading}
            onClick={goBack}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            rounded="md"
            bgch="gray-600"
            bgc="white"
            color="white"
            colorh="white"
            classes="w-32 h-8 bg-gray-800 ml-8"
            disabled={loading}
            loading={loading}
          >
            Update
          </Button>
        </div>
      </form>
    </>
  );
};

export default SettingsModal;
