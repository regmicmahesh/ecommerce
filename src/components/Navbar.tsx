import React from "react";
import { Link } from "react-router-dom";

interface loginStatus {
  isLoggedIn?: boolean;
   logout: Function
}

const NavBar: React.FC<loginStatus> = ({ isLoggedIn, logout }: loginStatus) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        PASAL
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {!isLoggedIn ? (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" onClick={() => logout()}>
                Logout
              </a>
            </li>{" "}
          </ul>
        )}
      </div>
    </nav>
  );
};

NavBar.defaultProps = {
  isLoggedIn: false,
};

export default NavBar;
