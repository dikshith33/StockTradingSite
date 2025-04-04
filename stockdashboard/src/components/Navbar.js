import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userLoggedIn, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">📈 Stock Market</Link>
        <div className="ml-auto">
          {userLoggedIn ? (
            <button onClick={onLogout} className="btn btn-danger">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary mx-2">Login</Link>
              <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
