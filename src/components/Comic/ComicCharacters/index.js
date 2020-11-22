import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Slip from "../../Share/Slip";
import {
  getFavoritesCharacters,
  updateFavoritesCharacters,
} from "../../../Utils/Favorites";

import "./index.css";

const handleGetData = async (id, setIsLoading, setComicCharacters) => {
  try {
    const response = await axios.get(
      `https://reacteur-marvel.herokuapp.com/comics/${id}/characters?limit=100&orderBy=name`
    );
    setComicCharacters(response.data.results);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

const ComicCharacters = () => {
  const location = useLocation();
  const { id, title, description, picture } = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [comicCharacters, setComicCharacters] = useState(null);
  const [favoritesCharacters, setFavoritesCharacters] = useState(
    getFavoritesCharacters()
  );

  const handleSetFavoritesCharacters = (id, value) => {
    setFavoritesCharacters(updateFavoritesCharacters(id, value));
  };

  useEffect(() => {
    handleGetData(id, setIsLoading, setComicCharacters);
  }, [id]);

  return (
    <>
      <Slip
        isLoading={isLoading}
        title={title}
        description={description}
        imageUrl={`${picture.path}/detail.${picture.extension}`}
        thumbailTitle="Character(s)"
        thumbailDatas={comicCharacters}
        thumbailLabelName="name"
        thumbailAspect="landscape_medium"
        favorites={favoritesCharacters}
        setFavorites={handleSetFavoritesCharacters}
      />
    </>
  );
};

export default ComicCharacters;
