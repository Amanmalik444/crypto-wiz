import * as React from "react";
import ReactHtmlParser from "react-html-parser";

import { Button } from "../../../../Components/Bricks";

interface IProps {
  categories: any;
  description: any;
  links: any;
  platforms: any;
}

const Desc = ({ categories, description, links, platforms }: IProps) => {
  const [readMoreClicked, setReadMore] = React.useState<boolean>(false);
  let des =
    description &&
    description.en &&
    description.en.replaceAll(
      "<a ",
      '<a style=" text-decoration: underline; font-weight: 450;" '
    );

  return (
    <div className="flex flex-col flex-wrap items-center justify-center w-full py-5">
      <hr className="w-4/5 pb-2" />
      <div className="flex flex-row flex-wrap items-center justify-center mx-3">
        <p className="text-sm font-medium w-32 text-center">Categories </p>
        {categories &&
          categories.map((cat: string) => {
            return <p className="text-sm font-small border m-2 p-1">{cat} </p>;
          })}
      </div>
      <p
        className={`my-1 text-sm font-small text-start max-w-3/4
      ${readMoreClicked ? "" : "truncate"}`}
      >
        {ReactHtmlParser(des)}
      </p>
      {!readMoreClicked && des.length > 50 && (
        <Button
          rounded="md"
          bgch="gray-700"
          bgc="gray-500"
          color="white"
          colorh="white"
          className="w-24 h-7 my-2 text-sm"
          outline={false}
          onClick={() => {
            setReadMore(true);
          }}
        >
          Read more
        </Button>
      )}

      {/* {links}, */}
      {/* {platforms}, */}
    </div>
  );
};

export default Desc;
