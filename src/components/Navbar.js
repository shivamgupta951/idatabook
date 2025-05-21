import React from "react";
import { NavLink } from "react-router-dom";
import { LuBookOpen } from "react-icons/lu";
import { FaLock } from "react-icons/fa6";
import { BiHome } from "react-icons/bi";
import { FaCircleInfo } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
const Navbar = (props) => {
  const emptytoken = () => {
    localStorage.removeItem("token");
    window.location.reload(); // This reloads the current page
  };
  const HomeTriggered = () => {
    props.showAlert("Login to An Account to Unlock Home Page!", "danger");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand border px-2" to="/">
          <LuBookOpen style={{ fontSize: "30px", marginRight: "5px" }} />
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
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                >
                  <div>
                    {" "}
                    <BiHome
                      style={{
                        fontSize: "20px",
                        marginBottom: "3px",
                        marginRight: "1px",
                      }}
                    />
                    Home
                  </div>
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                  onClick={HomeTriggered}
                >
                  <div>
                    {" "}
                    <BiHome
                      style={{
                        fontSize: "20px",
                        marginBottom: "3px",
                        marginRight: "1px",
                      }}
                    />
                    Home
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <FaLock style={{ fontSize: "8px" }} />
                  </div>
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
              >
                <FaCircleInfo
                  style={{
                    fontSize: "20px",
                    marginBottom: "3px",
                    marginRight: "3px",
                  }}
                />
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
                      style={{ width: "80px" }}
                    >
                      <IoLogIn
                        style={{
                          fontSize: "20px",
                          marginBottom: "3px",
                          marginRight: "3px",
                        }}
                      />
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        `nav-link${isActive ? " active" : ""}`
                      }
                      style={{ width: "100px" }}
                    >
                      <MdPeopleAlt
                        style={{
                          fontSize: "20px",
                          marginBottom: "3px",
                          marginRight: "3px",
                        }}
                      />
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
                    style={{width: "100px"}}
                  >
                    <IoLogIn
                      style={{
                        fontSize: "20px",
                        marginBottom: "3px",
                        marginRight: "3px",
                      }}
                    />
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
