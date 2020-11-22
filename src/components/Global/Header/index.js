import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";
import logo from "../../../assets/Marvel-Comics-Logo.575beca3.png";

const Header = () => {
  const [highlightCharacters, setHighlightCharacters] = useState(false);
  const [highlightComics, setHighlightComics] = useState(false);
  const [highlightFavourites, setHighlightFavourites] = useState(false);

  return (
    <header>
      <div className="header-topbar">
        <div>
          <img src={logo} alt="logo Marvel" />
          <div>
            <div
              className={
                highlightCharacters
                  ? "header-topbar-menu header-topbar-menu-highlight"
                  : "header-topbar-menu"
              }
              onMouseEnter={() => {
                setHighlightCharacters(true);
              }}
              onMouseLeave={() => {
                setHighlightCharacters(false);
              }}
            >
              <Link to="/">CHARACTERS</Link>
            </div>
            <div
              className={
                highlightComics
                  ? "header-topbar-menu header-topbar-menu-highlight"
                  : "header-topbar-menu"
              }
              onMouseEnter={() => {
                setHighlightComics(true);
              }}
              onMouseLeave={() => {
                setHighlightComics(false);
              }}
            >
              <Link to="/comics">COMICS</Link>
            </div>
            <div
              className={
                highlightFavourites
                  ? "header-topbar-menu header-topbar-menu-highlight"
                  : "header-topbar-menu"
              }
              onMouseEnter={() => {
                setHighlightFavourites(true);
              }}
              onMouseLeave={() => {
                setHighlightFavourites(false);
              }}
            >
              <Link to="/favourites">MY FAVS</Link>
            </div>
          </div>
          <button>Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
