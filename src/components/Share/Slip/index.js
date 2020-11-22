import React from "react";
import Loading from "../Loading";
import Thumbail from "../Thumbail";
import "./index.css";

const Slip = ({
  isLoading,
  title,
  description,
  imageUrl,
  thumbailTitle,
  thumbailDatas,
  thumbailLabelName,
  thumbailAspect,
  favorites,
  setFavorites,
}) => {
  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="slip">
          <div>
            <img src={imageUrl} alt={title} />
          </div>
          <div>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <div>
              <h3>{thumbailTitle}</h3>
              <div className="slip-cards">
                {thumbailDatas.map((item) => {
                  return (
                    <Thumbail
                      key={item.id}
                      id={item.id}
                      title={item[thumbailLabelName]}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      imageUrl={`${item.thumbnail.path}/${thumbailAspect}.${item.thumbnail.extension}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Slip;
