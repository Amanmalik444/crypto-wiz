import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { categoriesNews, projectTypes } from "../../utils";

// interface IParams {
//   history: { push: (url: string) => void };
// }

interface IState {
  data: [];
  loading: boolean;
  projectType: string;
  category: string | null;
  page: number;
}

const useData = () => {
  const [data, setData] = React.useState<IState["data"]>();
  const [loading, setLoading] = React.useState<IState["loading"]>(false);
  const [page, setPage] = React.useState<IState["page"]>(1);
  const [projectType, setProjectType] = React.useState<IState["projectType"]>(
    projectTypes[0].value
  );
  const [category, setCategory] = React.useState<IState["category"]>(
    categoriesNews[0].value
  );

  React.useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://api.coingecko.com/api/v3/status_updates?per_page=10&page=${page}${
          category !== "all_cat" ? `&category=${category}` : ""
        }${
          projectType !== "all_project_types"
            ? `&project_type=${projectType}`
            : ""
        }`
      )
      .then((res: any) => {
        setData(res.data.status_updates);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Trouble reaching the server");
        setLoading(false);
        console.log(err);
      });
  }, [projectType, category, page]);

  const states = {
    data,
    loading,
    page,
    categoriesNews,
    projectTypes,
  };

  return { states, setProjectType, setPage, setCategory };
};

export default useData;
