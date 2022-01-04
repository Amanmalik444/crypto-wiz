import * as React from "react";

import { darkLogo } from "utils";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col items-center bg-black text-md text-center">
      <div className="flex flex-col justify-center items-center text-white py-4">
        <img className="h-28 w-68 my-4" src={darkLogo} alt="Crypto Wiz" />
        <p className="mx-7 text-gray-300">
          Feel free to give feedback on Crypto-Wiz, I've listed all my socials
          below.
        </p>
        <div
          className="flex flex-row flex-wrap items-center justify-around
           my-8 px-4"
        >
          <a href="https://github.com/Amanmalik444">
            <i className="bx bxl-github text-5xl cursor-pointer mr-4 md:mr-12" />
          </a>
          <a href="https://www.linkedin.com/in/amanmalik444/">
            <i className="bx bxl-linkedin text-5xl cursor-pointer mx-4 md:mx-12" />
          </a>
          <a href="https://twitter.com/Amanmalik77">
            <i className="bx bxl-twitter text-5xl cursor-pointer mx-4 md:mx-12" />
          </a>
          <a href="https://www.instagram.com/amanmalik77_/">
            <i className="bx bxl-instagram text-5xl cursor-pointer ml-4 md:ml-12" />
          </a>
        </div>
        <hr className="border-gray-600 w-full" />
        <p className="w-full my-4 text-gray-300 animate-pulse">
          Created by Aman Malik
        </p>
      </div>
    </footer>
  );
};

export default Footer;
