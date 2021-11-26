import toast from "react-hot-toast";
import moment from "moment";

import useData from "./data";
import { Spinner, NoDataFetched } from "../../Components/Bricks";
import { Filters, Pagination } from "../../Components/Mansions";

const StatusUpdates = () => {
  const { states, setProjectType, setPage, setCategory } = useData();

  const { data, loading, page, categoriesNews, projectTypes } = states;

  console.log(data);

  return (
    <div className="pt-20 w-full bg-gray-200 flex flex-col flex-wrap items-center justify-center">
      <Filters
        selectArray={[
          { setHook: setProjectType, options: projectTypes },
          { setHook: setCategory, options: categoriesNews },
        ]}
      />
      {loading ? (
        <Spinner height="4xl" className="my-60" />
      ) : data && data!.length > 0 ? (
        <div className="flex flex-col gap-8 py-5 w-full items-center justify-center">
          {data?.map((update: any) => (
            <div className="w-11/12 rounded-xl shadow-md hover:shadow-lg">
              <div
                className="flex flex-row w-full items-center divide-x divide-gray-300 
              justify-between text-sm border-8 border-white bg-gray-100
              rounded-t-xl text-gray-400 font-semibold"
              >
                {update.category && (
                  <p className="px-4 my-2">Category {update.category}</p>
                )}
                {update.user && <p className="px-4 my-2">User {update.user}</p>}
                {update.user_title && (
                  <p className="px-4 my-2">User-Title {update.user_title}</p>
                )}
                {update.created_at && (
                  <p className="px-4 my-2">
                    {moment(update.created_at).fromNow()}
                  </p>
                )}
              </div>
              <p className="bg-white p-4 rounded-b-xl w-full break-words">
                {update.description || "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <NoDataFetched
          errorMessage="No data fetched"
          className="py-48"
          onClickNoData={() => {
            window.location.reload();
            toast.success("Refreshing Page");
          }}
        />
      )}
      <hr className="w-4/5 h-0.5 bg-gray-300 color-black mt-2" />
      <Pagination
        setPage={setPage}
        page={page}
        className="mt-5 bg-opacity-20"
      />
    </div>
  );
};

export default StatusUpdates;
