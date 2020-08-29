import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <p className="logo">Trello</p>
      {localStorage.getItem("jwt") && (
        <div className="links">
          <Link to="/" className="all-boards">
            All Boards
          </Link>
          <Link to="/" className="logout">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
