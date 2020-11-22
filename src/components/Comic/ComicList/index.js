import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "../../Share/List";
import Loading from "../../Share/Loading";
import Paging from "../../Share/Paging";
import SearchBar from "../../Share/SearchBar";
import {
  getFavoritesComics,
  updateFavoritesComics,
} from "../../../Utils/Favorites";
import "./index.css";

const handleGetComics = async (
  searchCriteria,
  requestedPage,
  setIsLoading,
  setComics,
  setCurrentPage,
  setCountPage
) => {
  try {
    let params = "?limit=100&orderBy=title";
    params +=
      requestedPage && Number(requestedPage) > 1
        ? `&offset=${(Number(requestedPage) * 100).toFixed(0)}`
        : "";
    params += searchCriteria ? `&titleStartsWith=${searchCriteria}` : "";
    const response = await axios.get(
      "https://git.heroku.com/reacteur-marvel.git/comics" + params
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
    setComics(response.data.results);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

const ComicList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState(null);
  const [search, setSearch] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);
  const [requestedPage, setRequestedPage] = useState(1);
  const [favoritesComics, setFavoritesComics] = useState(getFavoritesComics());

  const handleSetFavoritesComics = (id, value) => {
    setFavoritesComics(updateFavoritesComics(id, value));
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
    handleGetComics(
      searchCriteria,
      requestedPage,
      setIsLoading,
      setComics,
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
        <div className="comiclist">
          <SearchBar search={search} setSearch={setSearch} />
          <List
            gridDisplay={true}
            isLoading={isLoading}
            title="DISCOVER OUR COMICS"
            cardDatas={comics}
            cardLabelName="title"
            imageAspect="portrait_incredible"
            cardRoute="/comic"
            favorites={favoritesComics}
            setFavorites={handleSetFavoritesComics}
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

export default ComicList;
