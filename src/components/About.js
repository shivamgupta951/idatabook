import React from "react";
import { useState } from "react";
import Backgroundimage from "../images/Background_image.png";
import { IoIosGitNetwork } from "react-icons/io";
import { FaGithubSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const backgroundStyle = {
    backgroundImage: `url(${Backgroundimage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "92vh",
    width: "100%",
    padding: "5% 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontStyle: "oblique",
  };
  const keyfeatures = {
    height: "90%",
    paddingLeft: "10%",
    width: "80%",
    backgroundColor: "#130C30",
    borderRadius: "2%",
    transition: "all 0.3s ease",
    boxShadow: isHovered
      ? "15px 15px 50px 15px rgba(0, 0, 0, 0.6)"
      : "10px 10px 40px 10px black",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    color: "white",
    outline: "7px solid rgba(74, 39, 103, 0.94)",
  };
  const featureTechnologies = {
    marginTop: "6%",
    backgroundColor: "#130C30",
    color: "white",
    borderRadius: "12%",
    height: "50%",
    width: "50%",
    transition: "all 0.3s ease",
    boxShadow: isHovered1
      ? "15px 15px 50px 15px rgba(0, 0, 0, 0.6)"
      : "10px 10px 40px 10px black",
    transform: isHovered1 ? "scale(1.05)" : "scale(1)",
    outline: "7px solid rgba(74, 39, 103, 0.94)",
  };
  const ownercard = {
    height: "70%",
    width: "60%",
    borderRadius: "10%",
    backgroundColor: "black",
    transition: "all 0.3s ease",
    boxShadow: isHovered2
      ? "15px 15px 50px 15px rgba(0, 0, 0, 0.6)"
      : "10px 10px 40px 10px black",
    transform: isHovered2 ? "scale(1.05)" : "scale(1)",
    outline: "7px solid rgba(74, 39, 103, 0.94)",
    paddingBottom: "5px"
  };
  return (
    <div style={backgroundStyle}>
      <div
        className="d-flex justify-content-around align-items-start"
        style={{ height: "80vh", width: "80%" }}
      >
        <div
          className="d-flex justify-content-center align-items-start"
          style={{ height: "100%", width: "45%" }}
        >
          <div
            className="border"
            style={keyfeatures}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div style={{ marginTop: "5%" }}>
              <h3 className="d-flex justify-content-start align-items-center">
                <IoIosGitNetwork
                  style={{ fontSize: "45px", marginRight: "2%" }}
                />{" "}
                Key Features of iDatabook
              </h3>
            </div>
            <div style={{ paddingLeft: "4%" }}>
              <ul style={{ marginTop: "5%", fontSize: "20px" }}>
                <li style={{ marginTop: "13px" }}>Secure Authentication</li>
                <li style={{ marginTop: "13px" }}>Personal Notes Management</li>
                <li style={{ marginTop: "13px" }}>Tagging System</li>
                <li style={{ marginTop: "13px" }}>Real-time Updates</li>
                <li style={{ marginTop: "13px" }}>Responsive Design</li>
                <li style={{ marginTop: "13px" }}>Alerts & Feedback</li>
                <li style={{ marginTop: "13px" }}>
                  Token-based Session Management
                </li>
                <li style={{ marginTop: "13px" }}>
                  Auto Redirect on Session Expiry
                </li>
                <li style={{ marginTop: "13px" }}>Rich UI Components</li>
                <li style={{ marginTop: "13px" }}>
                  Modular React Architecture
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="" style={{ height: "100%", width: "40%" }}>
          <div
            className="border"
            style={featureTechnologies}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
          >
            <div
              className=" d-flex justify-content-center align-items-center"
              style={{ marginTop: "9%" }}
            >
              <h4>Future Technologies</h4>
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ fontSize: "15px" }}
            >
              <ul>
                <li style={{ marginTop: "3%" }}>Dark Mode</li>
                <li style={{ marginTop: "3%" }}>Search & Filter Notes</li>
                <li style={{ marginTop: "3%" }}>Pinning and Archiving Notes</li>
                <li style={{ marginTop: "3%" }}>Sync with cloud services</li>
              </ul>
            </div>
            <div style={{ marginLeft: "8%" }}>
              <h4>iDatabook</h4>
              <h5>1.0 beta</h5>
            </div>
          </div>
          <div
            className="d-flex justify-content-start align-items-center"
            style={{
              height: "45%",
              color: "white",
            }}
          >
            <div
              className="border"
              style={ownercard}
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            >
              <div
                style={{
                  marginLeft: "20%",
                  fontStyle: "oblique",
                  marginTop: "5%",
                }}
              >
                <h5>Created and</h5>
                <h5>developed By -</h5>
              </div>
              <div className="d-flex justify-content-center">
                <div style={{ fontStyle: "initial" }}>
                  <div style={{ marginTop: "4%" }}>
                    <FaGithubSquare style={{ fontSize: "33px" }} />{" "}
                    shivamgupta951
                  </div>
                  <div style={{ marginTop: "4%" }}>
                    <FaInstagramSquare style={{ fontSize: "33px" }} />{" "}
                    shivam_gupta951
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
