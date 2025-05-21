import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Backgroundimage from "../images/Background_image.png";
import blacktexture from "../images/blacktexture.png";
const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigate
  const [isHovered, setIsHovered] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Logged in Successfully", "success");
        navigate("/"); // Redirect to home
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
  const backgroundStyle = {
    backgroundImage: `url(${Backgroundimage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "92vh",
    width: "100vw",
    paddingTop: "5%",
  };
  const noiseBackground = {
    backgroundColor: "#fff",
    backgroundImage: `url(${blacktexture})`,
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    opacity: "0.9",
    width: "26%",
    height: "70%",
    borderRadius: "8%",
    transition: "all 0.3s ease",
    boxShadow: isHovered
      ? "15px 15px 50px 15px rgba(0, 0, 0, 0.6)"
      : "10px 10px 40px 10px black",
    transform: isHovered ? "scale(1.02)" : "scale(1)",
  };

  return (
    <div style={backgroundStyle}>
      <div
        className="container border"
        style={noiseBackground}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: "7%", color: "#f5f1f1" }}
        >
          Log in{" "}
        </h2>
        {!localStorage.getItem("token") && console.log("auth-token is empty!")}
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="mb-3" style={{ width: "80%", marginTop: "8%" }}>
              <label
                htmlFor="email"
                className="form-label"
                style={{ color: "white" }}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="mb-3" style={{ width: "80%", marginTop: "5%" }}>
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: "white" }}
              >
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div
            className="d-flex justify-content-start align-items-center"
            style={{ marginTop: "5%" }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginLeft: "10%" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
