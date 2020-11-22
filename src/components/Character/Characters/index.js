import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../../Share/List";
import Loading from "../../Share/Loading";
import Paging from "../../Share/Paging";
import SearchBar from "../../Share/SearchBar";
import {
  getFavoritesCharacters,
  updateFavoritesCharacters,
} from "../../../Utils/Favorites";

import "./index.css";

const handleGetCharacters = async (
  searchCriteria,
  requestedPage,
  setIsLoading,
  setCharacters,
  setCurrentPage,
  setCountPage
) => {
  try {
    let params = "?limit=100&orderBy=name";
    params +=
      requestedPage && Number(requestedPage) > 1
        ? `&offset=${(Number(requestedPage) * 100).toFixed(0)}`
        : "";
    params += searchCriteria ? `&nameStartsWith=${searchCriteria}` : "";
    const response = await axios.get(
      "http://localhost:3001/characters" + params
    );
    setCurrentPage(
      Number(response.data.offset) > 1
        ? Math.ceil(response.data.offset / 100)
        : 1
    );
    setCountPage(
      Number(response.data.total) > 0
        ? Math.floor(response.data.total / 100)
        : 0
    );
    setCharacters(response.data.results);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const [search, setSearch] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);
  const [requestedPage, setRequestedPage] = useState(1);
  const [favoritesCharacters, setFavoritesCharacters] = useState(
    getFavoritesCharacters()
  );

  const handleSetFavoritesCharacters = (id, value) => {
    setFavoritesCharacters(updateFavoritesCharacters(id, value));
  };
  useEffect(() => {
    if (!isLoading) {
      const delayToReload = setTimeout(() => {
        setRequestedPage(1);
        setSearchCriteria(search);
      }, 3000);
      return () => clearTimeout(delayToReload);
    }
  }, [search, isLoading]);

  useEffect(() => {
    handleGetCharacters(
      searchCriteria,
      requestedPage,
      setIsLoading,
      setCharacters,
      setCurrentPage,
      setCountPage
    );
  }, [searchCriteria, requestedPage]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="characters">
          <SearchBar search={search} setSearch={setSearch} />
          <List
            gridDisplay={true}
            isLoading={isLoading}
            title="DISCOVER OUR CHARACTERS"
            cardDatas={characters}
            cardLabelName="name"
            imageAspect="standard_fantastic"
            cardRoute="/character"
            favorites={favoritesCharacters}
            setFavorites={handleSetFavoritesCharacters}
          />
          <Paging
            currentPage={currentPage}
            countPage={countPage}
            setRequestedPage={setRequestedPage}
          />
        </div>
      )}
    </>
  );
};

export default Characters;
