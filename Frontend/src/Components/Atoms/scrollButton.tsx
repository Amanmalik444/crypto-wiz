import * as React from "react";

const Button: React.FC = () => {
  const [direction, setDirection] = React.useState<string>("down");
  window.onscroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
      // && document.getElementById("myBtn") !== null
    ) {
      //@ts-ignore
      // document.getElementById("myBtn").style.display = "block";
      setDirection("up");
    } else {
      //@ts-ignore
      // document.getElementById("myBtn").style.display = "none";
      setDirection("down");
    }
  };

  const movePage = () => {
    if (direction == "up") {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <button
      onClick={movePage}
      id="myBtn"
      className="fixed bottom-10 right-10 h-14 w-14 
        text-4xl text-white shadow-lg text-center
        bg-red-600 border border-red-500 rounded-full
        hover:bg-red-500 transition duration-300"
    >
      <i className={`bx bx-chevron-up transition duration-500 
       ${direction==="down" && "transform rotate-180"} `} />
    </button>
  );
};

export default Button;
