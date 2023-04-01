import React from "react";
import { useState } from "react";
import search from "../assets/search.png";
import filter from "../assets/filter.png";
import arrow_back from "../assets/arrow_back.png";

export const SearchBar = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [arrow, setArrow] = useState(true);

  return (
    <div className="mt-1 w-full bg-[white] flex justify-between items-center">
      <div className="w-[80%] m-2 rounded-md bg-[#d1d7db] flex py-1 items-center">
        <label htmlFor="search">
          <img
            src={arrow ? search : arrow_back}
            alt="Search Icon"
            className="h-6 mr-9 cursor-pointer"
            onClick={() => setArrow(!arrow)}
          />
        </label>
        <input
          id="search"
          type="text"
          className="w-full bg-inherit outline-none "
          placeholder="Search Chat"
          // onFocus={() => setArrow(!arrow)}
          // offFocus={() => setArrow(!arrow)}
        />
      </div>
      <img
        src={filter}
        alt="Filter Icon"
        className={`h-6 mr-2  cursor-pointer ${
          toggleSearch ? "bg-[#3ccabe] rounded-full" : " "
        } `}
        onClick={() => setToggleSearch(!toggleSearch)}
      />
    </div>
  );
};
