import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const emptytoken = ()=>
  {
    localStorage.removeItem('token');
    window.location.reload(); // This reloads the current page
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          iDatabook
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!localStorage.getItem("token") ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      end
                      className={({ isActive }) =>
                        `nav-link${isActive ? " active" : ""}`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        `nav-link${isActive ? " active" : ""}`
                      }
                    >
                      SignUp
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link active" 
                    onClick={emptytoken}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
