import * as React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col items-center bg-black">
      <div
        className="w-full md:w-2/3 px-4 md:px-0 py-4
      flex flex-col items-center"
      >
        <h1 className="text-white text-7xl font-bold">
          Managing Cryptos made easy
        </h1>
        <p className="my-4 text-gray-400">
          Feel free to give feedback on Crypto-Wiz, I've listed all my socials
          below.
        </p>
        <div className="flex flex-col justify-center text-white">
          <div
            className="flex flex-row flex-wrap items-center justify-around
           my-8 px-4"
          >
            <a href="https://github.com/Amanmalik444" target="_blank">
              <i className="bx bxl-github text-5xl cursor-pointer mr-4 md:mr-12" />
            </a>
            <a href="https://www.linkedin.com/in/amanmalik444/" target="_blank">
              <i className="bx bxl-linkedin text-5xl cursor-pointer mx-4 md:mx-12" />
            </a>
            <a href="https://twitter.com/Amanmalik77" target="_blank">
              <i className="bx bxl-twitter text-5xl cursor-pointer mx-4 md:mx-12" />
            </a>
            <a href="https://www.instagram.com/amanmalik77_/" target="_blank">
              <i className="bx bxl-instagram text-5xl cursor-pointer ml-4 md:ml-12" />
            </a>
          </div>
          <hr className="border-gray-600 w-full" />
          <p className="w-full text-center my-4 text-gray-300 animate-pulse">
            Created by Aman Malik
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
