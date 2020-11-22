import React, { useState } from "react";
import { Link } from "react-router-dom";
import { checkIsFavorite } from "../../../Utils/Favorites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Image = ({ id, title, imageUrl, linkData, favorites, setFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(
    favorites ? checkIsFavorite(favorites, id) : false
  );

  return (
    <div className="image">
      {linkData ? (
        <Link to={linkData}>
          <img src={imageUrl} alt={title} />
        </Link>
      ) : (
        <img src={imageUrl} alt={title} />
      )}
      <div
        onClick={() => {
          const newValue = !isFavorite;
          setFavorites(id, newValue);
          setIsFavorite(newValue);
        }}
      >
        <FontAwesomeIcon
          icon={faStar}
          className={isFavorite ? "image-favorite-star" : "image-normal-star"}
        />
      </div>
    </div>
  );
};

export default Image;
