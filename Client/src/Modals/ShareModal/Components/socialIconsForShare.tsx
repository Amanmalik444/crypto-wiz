import * as React from "react";

import { Tooltip } from "Components/Bricks";

interface IProps {
  shareNote: string;
  link: string;
}

const SocialIconsForShare: React.FC<IProps> = ({
  shareNote = "",
  link = "",
}) => {
  return (
    <>
      <div
        className="flex flex-row justify-around items-center flex-wrap 
          p-4 text-4xl"
      >
        <Tooltip tooltipLabel="Share on Twitter">
          <a
            className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=${shareNote} ${link}`}
            data-size="large"
          >
            <i className="bx bxl-twitter text-blue-500 cursor-pointer" />
          </a>
        </Tooltip>
        <Tooltip tooltipLabel="Share on Whatsapp">
          <a
            href={`whatsapp://send?text=${shareNote} ${link}`}
            data-action="share/whatsapp/share"
          >
            <i className="bx bxl-whatsapp text-green-500 cursor-pointer" />
          </a>
        </Tooltip>
        <Tooltip tooltipLabel="Share on Facebook">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${link}&quote=${shareNote}`}
          >
            <i className="bx bxl-facebook-square text-blue-700 cursor-pointer" />
          </a>
        </Tooltip>
        <Tooltip tooltipLabel="Share on Mail">
          <a
            href={`mailto:abc@example.com?subject=${shareNote}&body=${shareNote} ${link}`}
          >
            <i className="bx bx-mail-send text-red-500 cursor-pointer" />
          </a>
        </Tooltip>
        <Tooltip tooltipLabel="Share on LinkedIn">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${link}&title=${shareNote}&summary=${shareNote}`}
          >
            <i className="bx bxl-linkedin-square text-blue-500 cursor-pointer" />
          </a>
        </Tooltip>
      </div>
    </>
  );
};

export default SocialIconsForShare;
