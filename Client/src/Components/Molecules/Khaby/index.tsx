import { useHistory } from "react-router-dom";

import { khaby } from "utils";
import { Button } from "Components/Atoms";

const Khaby = () => {
  const history = useHistory();
  return (
    <div
      className="h-screen w-full
    pt-5"
    >
      <div
        className="h-screen w-full
      bg-contain bg-no-repeat bg-center 
      flex flex-wrap justify-center items-center
      pt-20"
        style={{
          backgroundImage: `url(${khaby})`,
        }}
      >
        <Button
          rounded="lg"
          bgch="gray-700"
          bgc="white"
          color="white"
          colorh="white"
          className="w-64 h-10 bg-gray-900"
          onClick={() => {
            history.push(`/`);
            localStorage.setItem("jwt", "");
            localStorage.setItem("user", "");
          }}
        >
          Please login to use this feature
        </Button>
      </div>
    </div>
  );
};

export default Khaby;
