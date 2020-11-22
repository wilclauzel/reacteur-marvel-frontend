import React from "react";
import Image from "../Image";
import "./index.css";

const Thumbail = ({ id, title, imageUrl, favorites, setFavorites }) => {
  return (
    <div className="thumbail">
      <div>
        <Image
          id={id}
          title={title}
          imageUrl={imageUrl}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </div>

      <h4>{title}</h4>
    </div>
  );
};

export default Thumbail;
