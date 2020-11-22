import React from "react";
import Card from "../../Share/Card";

import "./index.css";

const List = ({
  isLoading,
  title,
  subtitle,
  cardDatas,
  cardLabelName,
  imageAspect,
  cardRoute,
  favorites,
  setFavorites,
  gridDisplay,
}) => {
  return (
    <>
      {isLoading ? (
        <div>
          <p>En cours de chargement</p>{" "}
        </div>
      ) : (
        <div className="list">
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
          <div
            className={gridDisplay ? "list-grid-display" : "list-bar-display "}
          >
            {/* TODO remettre la bonne key  */}
            {cardDatas &&
              cardDatas.map((item, index) => {
                const linkData = {
                  pathname: cardRoute,
                  state: {
                    id: item.id,
                    title: item[cardLabelName],
                    description: item.description,
                    picture: item.thumbnail,
                  },
                };
                return (
                  <div key={index}>
                    <Card
                      id={item.id}
                      title={item[cardLabelName]}
                      description={item.description}
                      imageUrl={`${item.thumbnail.path}/${imageAspect}.${item.thumbnail.extension}`}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      linkData={linkData}
                      portraitAspect={imageAspect.search("portrait") >= 0}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default List;
