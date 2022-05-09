import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function LogOutButton() {
  const navigate = useNavigate();

  function logOut()
  {
    axios.get('/users/logOut')
    .then((response) => {
        navigate("/")
    })
    .catch((error) => {
      console.log(error);
      console.log("error here")
    });
  }

  return (
    <div class="logout-button">
      <button type="button" class="btn btn-primary" onClick={() => logOut()}>Log Out</button>
    </div>
  );
}
