import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import LoginPagePicture from "../../pictures/woman_on_phone_photo.jpg";

export default function RegisterPage() {
  const [registerName, setRegisterName] = useState();
  const [registerEmail, setRegisterEmail] = useState();
  const [registerPassword, setRegisterPassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    checkCookie();
  }, []);

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });
      console.log(response);
      if (response.status === 201) login();
      else alert("Email Exists");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("/users/login", {
        email: registerEmail,
        password: registerPassword,
      });
      console.log(response);
      if (response.status === 200) navigate("/Dashboard");
      else alert("Incorrect password");
    } catch (error) {
      console.log(error);
    }
  };

  const checkCookie = async () => {
    try {
      const response = await axios.get("/users/checkCookie");
      if (response.status === 200) navigate("/Dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const goToLogin = () => navigate("/");

  return (
    <div className="register-page">
      <form onSubmit={register} className="register-container">
        <div className="header-container">
          <img src="/phone.png" className="header-image" />
          <h1 className="register-header">Contact Manager</h1>
        </div>
        <h2 className="login-box-header">Create your account</h2>
        <div className="input-container">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            onChange={(e) => setRegisterName(e.target.value)}
          ></input>
        </div>
        <div class="input-container">
          <label class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          ></input>
        </div>
        <div class="input-container">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          ></input>
        </div>
        <div class="input-container">
          <button type="submit" class="btn btn-primary register-button">
            Sign up
          </button>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-link"
            onClick={() => goToLogin()}
          >
            Already have an Account? Login
          </button>
        </div>
      </form>
    </div>
  );
}
