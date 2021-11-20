import moment from "moment";

import { TextData } from "../../../../Components/Bricks";

interface IProps {
  image: { large: string };
  name: string;
  symbol: string;
  hashing_algorithm: string;
  block_time_in_minutes: string;
  last_updated: string;
}

const DetailCard = ({
  image = { large: "" },
  name = "N/A",
  symbol = "N/A",
  hashing_algorithm = "N/A",
  block_time_in_minutes = "N/A",
  last_updated = "N/A",
}: IProps) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center w-full pb-5 shadow shadow-lg">
      <div className="flex justify-center items-start w-full sm:w-max sm:mr-8">
        <img className="h-36 w-36 object-contain" src={image.large} />
      </div>
      <div className=" flex flex-col flex-wrap items-center justify-start w-full sm:h-36 sm:w-max sm:ml-8">
        <div className="flex flex-row flex-wrap items-start justify-center">
          <TextData first="Name" second={name || "N/A"} />
          <TextData first="Symbol" second={symbol || "N/A" || "N/A"} />
          <TextData
            first="Hashing Algorithm"
            second={hashing_algorithm || "N/A"}
          />
          <TextData first="Block time (min)" second={block_time_in_minutes} />
        </div>
        <TextData
          first="Last updated on"
          secondFont="small"
          second={moment(last_updated).format("MMM Do YY, h:mm:ss a")}
        />
      </div>
    </div>
  );
};

export default DetailCard;
