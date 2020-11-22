import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Slip from "../../Share/Slip";
import {
  getFavoritesComics,
  updateFavoritesComics,
} from "../../../Utils/Favorites";

import "./index.css";

const handleGetData = async (id, setIsLoading, setCharacterComics) => {
  try {
    const response = await axios.get(
      `https://git.heroku.com/reacteur-marvel.git/characters/${id}/comics?limit=100&orderBy=title`
    );
    setCharacterComics(response.data.results);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
};

const CharacterComics = () => {
  const location = useLocation();
  const { id, title, description, picture } = location.state;
  const [isLoading, setIsLoading] = useState(true);
  const [characterComics, setCharacterComics] = useState(null);
  const [favoritesComics, setFavoritesComics] = useState(getFavoritesComics());

  const handleSetFavoritesComics = (id, value) => {
    setFavoritesComics(updateFavoritesComics(id, value));
  };

  useEffect(() => {
    handleGetData(id, setIsLoading, setCharacterComics);
  }, [id]);

  return (
    <>
      <Slip
        isLoading={isLoading}
        title={title}
        description={description}
        imageUrl={`${picture.path}/detail.${picture.extension}`}
        thumbailTitle="Comic(s)"
        thumbailDatas={characterComics}
        thumbailLabelName="title"
        thumbailAspect="landscape_medium"
        favorites={favoritesComics}
        setFavorites={handleSetFavoritesComics}
      />
    </>
  );
};

export default CharacterComics;
