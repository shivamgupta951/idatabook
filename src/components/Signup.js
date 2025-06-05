import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backgroundimage from "../images/Background_image.png";
import blacktexture from "../images/blacktexture.png";
import signup from "../images/signup_image.png";
const Signup = (props) => {
  const [isHovered, setIsHovered] = useState(false);
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
  };

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate(); // Initialize navigate
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    try {
      const response = await fetch(
        "https://idatabook-backend.onrender.com/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/"); // Redirect to home
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const noiseBackground = {
    backgroundColor: "#fff",
    backgroundImage: `url(${blacktexture})`,
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    opacity: "0.9",
    width: "90%", // Responsive width
    maxWidth: "500px", // Malximum width on larger screens
    height: "auto",
    minHeight: "400px",
    borderRadius: "8%",
    transition: "all 0.3s ease",
    boxShadow: isHovered
      ? "15px 15px 50px 15px rgba(11, 10, 10, 0.6)"
      : "10px 10px 40px 10px black",
    transform: isHovered ? "scale(1.02)" : "scale(1)",
    padding: "20px",
    margin: "20px",
    color: "white",
    marginTop: "5px",
    outline: "7px solid rgba(74, 39, 103, 0.94)",
  };
  const noiseBackground1 = {
    backgroundColor: "#fff",
    backgroundImage: `url(${signup})`,
    backgroundRepeat: "repeat",
    backgroundSize: "cover",
    opacity: "0.9",
    width: "70%", // Responsive width // Maximum width on larger screens
    height: "300",
    minHeight: "300px",
    transition: "all 0.3s ease",
    padding: "20px",
    margin: "0px",
    color: "white",
 };

  return (
    <div style={backgroundStyle}>
      <div className="" style={{ width: "30%" }}>
        <div className="" style={noiseBackground1}></div>
        <div
          className="border"
          style={{ height: "100px", width: "70%", backgroundColor: "black" }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              marginTop: "8%",
              color: "white",
            }}
          >
            Want to know about app? Click here{" "}
            <span
              style={{
                color: "#3d3dd1",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => navigate("/about")}
            >
              About
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              marginTop: "4%",
              color: "white",
            }}
          >
            Already have an Account? Then click here{" "}
            <span
              style={{
                color: "#3d3dd1",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
      <div
        className="container border"
        style={noiseBackground}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2
          className="text-center"
          style={{ marginTop: "5%", color: "#f5f1f1" }}
        >
          SignUp
        </h2>
        <form onSubmit={handleSubmit}>
          <div
            className="mb-3"
            style={{ width: "100%", marginTop: "5%", marginLeft: "14%" }}
          >
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              style={{ width: "70%" }}
              type="text"
              className="form-control"
              onChange={onChange}
              id="name"
              name="name"
              aria-describedby="emailHelp"
            />
          </div>
          <div
            className="mb-3"
            style={{ width: "100%", marginTop: "5%", marginLeft: "14%" }}
          >
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              style={{ width: "70%" }}
              type="email"
              className="form-control"
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div
            className="mb-3"
            style={{ width: "100%", marginTop: "5%", marginLeft: "14%" }}
          >
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              style={{ width: "70%" }}
              type="password"
              className="form-control"
              onChange={onChange}
              id="password"
              name="password"
              required
              minLength={6}
            />
          </div>
          <div
            className="mb-3"
            style={{ width: "100%", marginTop: "5%", marginLeft: "14%" }}
          >
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              style={{ width: "70%" }}
              type="password"
              className="form-control"
              onChange={onChange}
              id="cpassword"
              name="cpassword"
              required
              minLength={6}
            />
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "7%" }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", maxWidth: "200px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
