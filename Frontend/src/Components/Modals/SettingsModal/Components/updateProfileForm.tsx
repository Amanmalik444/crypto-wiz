import * as React from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Button,
} from "../../../Bricks";

interface IProps {
  goBack?: () => void;
}

const SettingsModal: React.FC<IProps> = ({ goBack = () => {} }) => {
  const [data, setData] = React.useState<[]>([]);
  const [name, setName] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const user = JSON.parse(localStorage.getItem("user") as string) || "";

  const fetch = () => {
    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    setData([]);
    fetch();
  }, []);

  return (
    <>
      <form className="flex flex-col flex-stretch justify-center items-center">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1 ml-2">New Name</label>
          <input
            className="w-64 border rounded py-2 px-4 text-gray-800"
            id="username"
            placeholder={user.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            required
          />
        </div>
        <div className="flex-row items-center justify-between mb-4">
          <Button
            type="submit"
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
            Update Profile
          </Button>
        </div>
      </form>
    </>
  );
};

export default SettingsModal;
