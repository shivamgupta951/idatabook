import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backgroundimage from "../images/Background_image.png";
import blacktexture from "../images/blacktexture.png";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
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
        navigate("/");
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
    minHeight: "92vh",
    width: "100%",
    padding: "5% 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const noiseBackground = {
    backgroundColor: "#fff",
    backgroundImage: `url(${blacktexture})`,
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    opacity: "0.9",
    width: "90%", // Responsive width
    maxWidth: "500px", // Maximum width on larger screens
    height: "auto",
    minHeight: "400px",
    borderRadius: "8%",
    transition: "all 0.3s ease",
    boxShadow: isHovered
      ? "15px 15px 50px 15px rgba(0, 0, 0, 0.6)"
      : "10px 10px 40px 10px black",
    transform: isHovered ? "scale(1.02)" : "scale(1)",
    padding: "20px",
    margin: "20px"
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
          className="text-center"
          style={{ marginTop: "5%", color: "#f5f1f1" }}
        >
          Log in
        </h2>
        {!localStorage.getItem("token") && console.log("auth-token is empty!")}
        <form onSubmit={handleSubmit}>
          <div className="mb-3" style={{ width: "100%", marginTop: "8%" }}>
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
          <div className="mb-3" style={{ width: "100%", marginTop: "5%" }}>
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
          <div className="d-flex justify-content-center" style={{ marginTop: "10%" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", maxWidth: "200px" }}
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