import React from "react";
import { NavLink } from "react-router-dom";
import { LuBookOpen } from "react-icons/lu";
import { FaLock } from "react-icons/fa6";
import { BiHome } from "react-icons/bi";
import { FaCircleInfo } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";

const Navbar = (props) => {
  const emptytoken = () => {
    localStorage.removeItem("token");
    window.location.reload();
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
                  <div className="d-flex align-items-center">
                    <BiHome
                      style={{
                        fontSize: "20px",
                        marginBottom: "3px",
                        marginRight: "5px",
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
                  <div className="d-flex align-items-center position-relative pe-3">
                    <BiHome
                      style={{
                        fontSize: "20px",
                        marginBottom: "3px",
                        marginRight: "5px",
                      }}
                    />
                    Home
                    <FaLock
                      className="position-absolute end-0"
                      style={{
                        fontSize: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
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
                <div className="d-flex align-items-center">
                  <FaCircleInfo
                    style={{
                      fontSize: "20px",
                      marginBottom: "3px",
                      marginRight: "5px",
                    }}
                  />
                  About
                </div>
              </NavLink>
            </li>
            <li className="nav-item py-1" style={{ marginLeft: "300px" }}>
              <div
                className=""
                style={{ fontSize: "11px", color: "white", height: "100%",fontFamily: "cursive"}}
              >
                <strong>
                  <div>A place for your short notes</div>
                  <div>
                    and memories!
                    <FaBookmark
                      size={11}
                      style={{ marginBottom: "4px", marginLeft: "2px" }}
                    />
                  </div>
                </strong>
              </div>
            </li>
          </ul>
          <form className="d-flex flex-lg-row flex-column align-items-lg-center gap-2">
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </div>
            <ul className="navbar-nav flex-row gap-lg-2">
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
                      <div className="d-flex align-items-center">
                        <IoLogIn
                          style={{
                            fontSize: "20px",
                            marginBottom: "3px",
                            marginRight: "5px",
                          }}
                        />
                        Login
                      </div>
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
                      <div className="d-flex align-items-center">
                        <MdPeopleAlt
                          style={{
                            fontSize: "20px",
                            marginBottom: "3px",
                            marginRight: "5px",
                          }}
                        />
                        SignUp
                      </div>
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link active"
                    onClick={emptytoken}
                    style={{ width: "100px" }}
                  >
                    <div className="d-flex align-items-center">
                      <IoLogIn
                        style={{
                          fontSize: "20px",
                          marginBottom: "3px",
                          marginRight: "5px",
                        }}
                      />
                      Logout
                    </div>
                  </NavLink>
                </li>
              )}
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
