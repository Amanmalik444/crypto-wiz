import ReactHtmlParser from "react-html-parser";

interface IProps {
  categories: any;
  description: any;
  links: any;
  platforms: any;
}

const Desc = ({ categories, description, links, platforms }: IProps) => {
  let des =
    description &&
    description.en &&
    description.en.replaceAll(
      "<a ",
      '<a style=" text-decoration: underline; font-weight: 450;" '
    );
  return (
    <div
      className="flex flex-col flex-wrap items-center justify-center 
      w-full py-5 px-4 border-b border-opacity-80"
    >
      <hr className="w-4/5 pb-2" />
      <div className="flex flex-row items-center justify-center ml-3 mr-3">
        <p className="text-sm font-medium">Categories </p>
        {categories &&
          categories.map((cat: string) => {
            return <p className="text-sm font-small border m-2 p-1">{cat} </p>;
          })}
      </div>
      <div className="px-5 pt-1">
        <p className="text-sm font-small">{ReactHtmlParser(des)}</p>
      </div>
      {/* {links}, */}
      {/* {platforms}, */}
    </div>
  );
};

export default Desc;
