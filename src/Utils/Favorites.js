import Cookies from "js-cookie";

// GET Functions
export const getFavoritesComics = () => {
  return getFavorites("FavoritesComics");
};
export const getFavoritesCharacters = () => {
  return getFavorites("FavoritesCharacters");
};
const getFavorites = (name) => {
  return Cookies.get(name) || "";
};

// UPDATE Functions
export const updateFavoritesComics = (id, value) => {
  return updateFavorites("FavoritesComics", id, value);
};
export const updateFavoritesCharacters = (id, value) => {
  return updateFavorites("FavoritesCharacters", id, value);
};
const updateFavorites = (name, id, value) => {
  let favorites = getFavorites(name);
  if (value) {
    favorites += favorites ? `,${id}` : `${id}`;
  } else {
    const pos = favorites.search(id);
    if (pos >= 0) {
      favorites = favorites.replace(pos > 0 ? `,${id}` : `${id}`, "");
    }
  }
  Cookies.set(name, favorites, { expires: 365 });
  return favorites;
};

// CHECK Functions
export const checkIsFavorite = (favorites, id) => {
  return favorites.search(id) >= 0;
};
