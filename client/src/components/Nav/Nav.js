import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark back-color">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <a className="navbar-brand" href="/search">
        Search
      </a>
      <a className="navbar-brand" href="/saved">
        Saved
      </a>
    </nav>
  );
}

export default Nav;
