import useData from "./data";

const News = () => {
  // const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const { states } = useData();

  const { data } = states;

  console.log(data);

  return (
    <div className="flex flex-wrap items-center justify-center w-full pt-20 pb-5">
      News
    </div>
  );
};

export default News;
