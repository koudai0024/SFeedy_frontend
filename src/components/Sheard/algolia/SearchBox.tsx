import type { ChangeEvent, KeyboardEvent, VFC } from "react";
import { useState } from "react";
import type { SearchBoxProvided } from "react-instantsearch-core";
import { connectSearchBox } from "react-instantsearch-dom";

const SearchBoxItem: VFC<SearchBoxProvided> = ({ refine }) => {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      refine(e.currentTarget.value);
    }
  };
  return (
    <div>
      <input
        className="w-full text-lg border-2 border-gray-600 rounded-full px-4 py-2 mb-4"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyPress={handleEnter}
      />
    </div>
  );
};

const SearchBox = connectSearchBox(SearchBoxItem);

export { SearchBox };
