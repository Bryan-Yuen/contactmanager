import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import LoginPagePicture from "../../pictures/woman_on_phone_photo.jpg";

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    checkCookie();
  }, []);

  const checkCookie = async () => {
    try {
      await axios.get("/users/checkCookie");
      navigate("/Dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("Im in here");
      await axios.post("/users/login", {
        email: loginEmail,
        password: loginPassword,
      });
      navigate("/Dashboard");
    } catch (error) {
      alert("Incorrect password");
    }
  };

  const goToRegister = () => navigate("/Register");

  return (
    <div className="login-page">
      <form onSubmit={loginHandler} className="login-container">
        <div className="header-container">
          <img src="/phone.png" className="header-image"/>
          <h1 className="login-header">Contact Manager</h1>
        </div>
        <h2 className="login-box-header">Welcome Back</h2>
        <div class="input-container">
          <label class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            onChange={(e) => setLoginEmail(e.target.value)}
          ></input>
        </div>
        <div class="input-container">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          ></input>
        </div>
        <div class="input-container">
          <button type="submit" class="btn btn-primary login-button">
            Login
          </button>
        </div>
        <div class="sign-up-button-container">
          <button type="button" class="btn btn-link sign-up-button" onClick={goToRegister}>
            Don't have an account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
