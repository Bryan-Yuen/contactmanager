import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './RegisterPage.css'

export default function RegisterPage() {
  const [registerName, setRegisterName] = useState()
  const [registerEmail, setRegisterEmail] = useState()
  const [registerPassword, setRegisterPassword] = useState()

  const navigate = useNavigate();

  useEffect(() => {
    checkCookie()
  }, [])

  const register = async () => {
    try {
      const response = await axios.post('/users/register', {
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
      console.log(response)
      if (response.status === 201)
        login()
      else
        alert("Email Exists")
    } catch (error) {
      console.log(error)
    }
  }

  const login = async () => {
    try {
      const response = await axios.post('/users/login', {
        email: registerEmail,
        password: registerPassword
      })
      console.log(response)
      if (response.status === 200)
        navigate("/Dashboard")
      else
        alert("Incorrect password")
    } catch (error) {
      console.log(error)
    }
  }

  const checkCookie = async () => {
    try {
      const response = await axios.get('/users/checkCookie')
      if (response.status === 200)
      navigate("/Dashboard")
    } catch (error) {
      console.log(error);
    }
  }

  const goToLogin = () => navigate("/")

  return (
    <div className='register-background'>
      <h1 className='register-header'>Contact Manager</h1>
      <div className='register-container'>
        <h2 className='register-container-header'>Register</h2>
        <form>
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" placeholder="Name" onChange={e => setRegisterName(e.target.value)}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="text" class="form-control" placeholder="Email" onChange={e => setRegisterEmail(e.target.value)}></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" placeholder="Password" onChange={e => setRegisterPassword(e.target.value)}></input>
          </div>
          <div class="d-grid gap-2">
            <button type="button" class="btn btn-primary" onClick={() => register()}>Register</button>
          </div>
          <div class="text-center">
            <button type="button" class="btn btn-link" onClick={() => goToLogin()}>Already have an Account? Click here to Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
