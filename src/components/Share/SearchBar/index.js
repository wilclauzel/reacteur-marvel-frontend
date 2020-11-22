import React from "react";
import "./index.css";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="searchbar">
      <div></div>
      <div className="searchbar-search">
        <input
          type="text"
          placeholder="LOOKING FOR SOMETHING"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div></div>
    </div>
  );
};

export default SearchBar;
