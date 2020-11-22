import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../Share/Loading";
import {
  getFavoritesCharacters,
  updateFavoritesCharacters,
  getFavoritesComics,
  updateFavoritesComics,
} from "../../../Utils/Favorites";
import List from "../../Share/List";

import "./index.css";

const handleLoadDatas = async (favorites, setDatas, routeName) => {
  try {
    const favs = favorites.split(",");
    const datas = [];
    for (let i = 0; i < favs.length; i++) {
      const id = favs[i];
      if (id) {
        const response = await axios.get(
          `http://localhost:3001/${routeName}/${id}`
        );
        if (Number(response.data.count) === 1) {
          datas.push(response.data.results[0]);
        }
      }
    }
    setDatas(datas);
  } catch (error) {
    console.log(error);
  }
};

const handleGetDatas = async (
  favoritesCharacters,
  favoritesComics,
  setIsLoading,
  setCharacters,
  setComics
) => {
  try {
    await handleLoadDatas(favoritesCharacters, setCharacters, "characters");
    await handleLoadDatas(favoritesComics, setComics, "comics");
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

const FavouriteList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const [comics, setComics] = useState(null);
  const [favoritesComics, setFavoritesComics] = useState(getFavoritesComics());
  const [favoritesCharacters, setFavoritesCharacters] = useState(
    getFavoritesCharacters()
  );

  const handleSetFavoritesCharacters = (id, value) => {
    setFavoritesCharacters(updateFavoritesCharacters(id, value));
  };
  const handleSetFavoritesComics = (id, value) => {
    setFavoritesComics(updateFavoritesComics(id, value));
  };

  useEffect(() => {
    handleGetDatas(
      favoritesCharacters,
      favoritesComics,
      setIsLoading,
      setCharacters,
      setComics
    );
  }, [favoritesCharacters, favoritesComics]);

  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="favourites">
          <h1>MY FAVS</h1>
          <div className="favourites-characters">
            <h2>MY CHARACTERS</h2>
            <div>
              <List
                gridDisplay={false}
                isLoading={isLoading}
                subtitle="MY CHARACTERS"
                cardDatas={characters}
                cardLabelName="name"
                imageAspect="standard_fantastic"
                cardRoute="/character"
                favorites={favoritesCharacters}
                setFavorites={handleSetFavoritesCharacters}
              />
            </div>
          </div>
          <div className="favourites-comics">
            <h2>MY COMICS</h2>
            <div>
              <List
                gridDisplay={false}
                isLoading={isLoading}
                subtitle="MY COMICS"
                cardDatas={comics}
                cardLabelName="title"
                imageAspect="standard_fantastic"
                cardRoute="/comic"
                favorites={favoritesComics}
                setFavorites={handleSetFavoritesComics}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavouriteList;
