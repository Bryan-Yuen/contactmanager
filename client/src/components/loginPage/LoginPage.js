import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import LoginPagePicture from '../../pictures/woman_on_phone_photo.jpg';

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    checkCookie();
  }, []);

  const checkCookie = async () => {
    try {
      await axios.get('/users/checkCookie');
      navigate('/Dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('Im in here');
      await axios.post('/users/login', {
        email: loginEmail,
        password: loginPassword,
      });
      navigate('/Dashboard');
    } catch (error) {
      alert('Incorrect password');
    }
  };

  const goToRegister = () => navigate('/Register');

  return (
    <div className="login-background">
      <div class="login-picture-container">
        <img src={LoginPagePicture}></img>
      </div>
      <div className='login-right-side'>
        <h1 className="login-header">Contact Manager</h1>
        <div className="login-container">
          <h2 className="login-box-header">Login</h2>
          <form onSubmit={loginHandler}>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                onChange={(e) => setLoginEmail(e.target.value)}
              ></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              ></input>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">
                Login
              </button>
            </div>
            <div>
              <button type="button" class="btn btn-link" onClick={goToRegister}>
                No account? Click here to sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
