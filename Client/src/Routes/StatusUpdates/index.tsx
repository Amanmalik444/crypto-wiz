import toast from "react-hot-toast";
import moment from "moment";
import { useHistory } from "react-router-dom";

import useData from "Routes/StatusUpdates/data";
import { Loader, NoDataFetched, Button } from "Components/Atoms";
import { Filters, Pagination } from "Components/Molecules";

const StatusUpdates = () => {
  const { states, setProjectType, setPage, setCategory } = useData();

  const { data, loading, page, categoriesNews, projectTypes } = states;

  const history = useHistory();

  return (
    <div className="pt-20 w-full bg-gray-200 flex flex-col flex-wrap items-center justify-center">
      <Filters
        selectArray={[
          { setHook: setCategory, options: categoriesNews },
          { setHook: setProjectType, options: projectTypes },
        ]}
      />
      {loading ? (
        <Loader size="3" width="12" className="my-64" />
      ) : data && data!.length > 0 ? (
        <div className="flex flex-col gap-8 py-5 w-full items-center justify-center">
          {data?.map((update: any) => (
            <div
              className="w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 rounded-xl 
            shadow-md hover:shadow-lg transition duration-200 ease-out"
            >
              <div
                className="flex flex-row w-full items-center divide-x divide-gray-300 
              justify-between rounded-t-xl border-8 border-white bg-gray-100
              text-sm text-gray-400 font-semibold capitalize py-2"
              >
                {update.category && (
                  <p className="px-4">{update.category} Category</p>
                )}

                {update.project && update.project.type && (
                  <p className="px-4">{update.project.type} Project</p>
                )}

                {update.created_at && (
                  <p className="px-4">{moment(update.created_at).fromNow()}</p>
                )}
              </div>

              <div
                className="w-full flex flex-row justify-start items-center
              pl-4 bg-white flex-wrap"
              >
                <Button
                  rounded="lg"
                  bgch="gray-300"
                  bgc="gray-100"
                  color="gray-900"
                  colorh="black"
                  className="flex flex-row justify-start items-center px-2 py-1"
                  onClick={() => {
                    history.push(`/coin/${update?.project?.id}`);
                  }}
                >
                  <img src={update.project.image.small} className="h-8 w-8" />
                  <div className="flex flex-row ml-4">
                    <p className="text-lg font-medium">
                      {update?.project?.name}
                    </p>
                    <p className="text-xs font-small">
                      {update?.project?.symbol}
                    </p>
                  </div>
                </Button>

                <p className="bg-white p-4 pt-2 w-full break-words">
                  {update.description || "N/A"}
                </p>
              </div>

              <p
                className="flex flex-row items-center justify-start 
              bg-gray-100 rounded-b-xl py-2 pl-4 text-gray-500 
              font-semibold text-sm"
              >
                - {update.user}
                {update.user && update.user_title && ","} {update.user_title}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <NoDataFetched
          errorMessage="No data fetched"
          className="py-48"
          onClick={() => {
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
