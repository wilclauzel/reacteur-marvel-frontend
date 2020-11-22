import React, { useState } from "react";
import Image from "../Image";
import "./index.css";

const Card = ({
  id,
  title,
  description,
  imageUrl,
  linkData,
  favorites,
  setFavorites,
  portraitAspect,
}) => {
  const [displayDescription, setDisplayDescription] = useState(false);
  const handleDisplayDescription = (value) => {
    setDisplayDescription(description ? value : false);
  };
  return (
    <div
      className="dataCard"
      onMouseEnter={() => {
        handleDisplayDescription(true);
      }}
      onMouseLeave={() => {
        handleDisplayDescription(false);
      }}
    >
      <div
        className={
          portraitAspect
            ? displayDescription
              ? "dataCard-image dataCard-portrait-minsize"
              : "dataCard-image dataCard-portrait-maxsize"
            : displayDescription
            ? "dataCard-image dataCard-image-minsize"
            : "dataCard-image dataCard-image-maxsize"
        }
      >
        <Image
          id={id}
          title={title}
          imageUrl={imageUrl}
          favorites={favorites}
          setFavorites={setFavorites}
          linkData={linkData}
        />
      </div>
      <div
        className={
          displayDescription
            ? "dataCard-info dataCard-info-maxsize"
            : "dataCard-info dataCard-info-minsize"
        }
      >
        <h4>{title}</h4>
        {displayDescription && (
          <div className="dataCard-info-bloc">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
