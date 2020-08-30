import React from "react";
import "../styles/Navbar.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions";

const Navbar = (props) => {
  const {
    isLoggedIn,
    history: { push },
    logout
  } = props;
  return (
    <nav className="Navbar">
      <p className="logo">Trello</p>
      {isLoggedIn && (
        <div className="links">
          <Link to="/" className="all-boards">
            All Boards
          </Link>
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("jwt");
              logout();
              push("/");
            }}
            className="logout"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default connect((state) => ({ isLoggedIn: state.user.isLoggedIn }), {
  logout
})(withRouter(Navbar));
