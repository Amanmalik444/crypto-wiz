import * as React from "react";

import { Selector } from "Components/Atoms";

interface IProps {
  selectArray: {
    setHook: any;
    options: { label: string | JSX.Element; value: string }[];
  }[];
}

const Filters: React.FC<IProps> = ({ selectArray }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-wrap flex-row items-center justify-center">
        {selectArray.map(
          (data: {
            setHook: any;
            options: { label: string | JSX.Element; value: string }[];
          }) => (
            <Selector
              onChange={(e) => {
                data.setHook(e?.value);
              }}
              options={data.options}
              defaultValue={data.options[0]}
              className="mx-3 my-2"
              bgc="gray-50"
              color="gray-600"
              colorh="gray-800"
              border="gray-400"
              borderh="gray-600"
            />
          )
        )}
      </div>
      <hr className="w-4/5 h-0.5 bg-gray-300 color-black my-2" />
    </div>
  );
};

export default Filters;
