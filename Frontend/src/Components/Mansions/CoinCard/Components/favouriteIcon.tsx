import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IProps {
  id: string | undefined;
  name: string | undefined;
  image: string | undefined;
  symbol: string | undefined;
  favByDefault: boolean;
}

const FavouriteIcon = ({
  id,
  name,
  image,
  symbol,
  favByDefault = false,
}: IProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [favourite, setFavourite] = React.useState<boolean>(favByDefault);

  let userId = JSON.parse(localStorage.getItem("user") as string)._id;
  let favId = String(userId) + "@SastaSalt" + String(id);

  React.useEffect(() => {
    if (!favByDefault) {
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_SERVER_LINK}/favourite/fetchByFavId`,
          { favId },
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem("jwt") as string),
            },
          }
        )
        .then((res: any) => {
          setLoading(false);
          setFavourite(res.data);
        })
        .catch((err) => {
          toast.error("An error occured");
          setLoading(false);
        });
    }
  }, []);

  const setAsFavourite = () => {
    setLoading(true);
    toast.loading(`Adding ${name || ""} to favourite list`, {
      id: "setFavourite",
    });
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/favourite/setAsFavourite`,
        { userId, cardData: { id, name, image, symbol, note: "" }, favId },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then(() => {
        toast.success(`${name || ""} added to favourite list`);
        toast.dismiss("setFavourite");
        setLoading(false);
        setFavourite(true);
      })
      .catch((err) => {
        toast.error("An error occured");
        toast.dismiss("setFavourite");
        setLoading(false);
      });
  };

  const removeFromFavourite = () => {
    setLoading(true);
    toast.loading(`Removing ${name || ""} from favourite list`, {
      id: "removeFavourite",
    });
    axios
      .post(
        `${process.env.REACT_APP_SERVER_LINK}/favourite/removeFromFavourite`,
        { userId, favId },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("jwt") as string),
          },
        }
      )
      .then(() => {
        toast.success(`${name || ""} removed from favourite list`);
        toast.dismiss("removeFavourite");
        setLoading(false);
        setFavourite(false);
      })
      .catch((err) => {
        toast.error("An error occured");
        toast.dismiss("removeFavourite");
        setLoading(false);
      });
  };

  return (
    <>
      <i
        onClick={() => {
          !loading && favourite ? removeFromFavourite() : setAsFavourite();
        }}
        className={`transition duration-300
          bx bxs-heart cursor-pointer transform
         ${favourite ? "text-red-500 scale-125" : "text-white"}`}
        style={{
          ...(!favourite && {
            textShadow:
              "0 1px 2px rgba(150,0,0,0.8), 0 0px 1px rgba(200,0,0,1)",
          }),
        }}
      />
    </>
  );
};

export default FavouriteIcon;
