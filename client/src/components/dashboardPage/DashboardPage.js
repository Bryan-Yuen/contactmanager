import axios from 'axios'
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import UserName from './UserName'
import ContactsTable from './ContactsTable'
import SearchBar from './SearchBar'
import LogOutButton from './LogOutButton'
import './DashboardPage.css'


export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    checkCookie()
  }, [])

  /*
  function checkCookie()
  {
    axios.get('/checkCookie')
    .then((response) => {
      if(response.data !== "User Logged in")
        navigate("/")
    })
    .catch((error) => {
      console.log(error);
      console.log("error here")
    });
  }
  */

  const checkCookie = async () => {
    try {
      const response = await axios.get('/users/checkCookie')
    } catch (error) {
      console.log(error);
      navigate("/")
    }
  }


  return (
    <div>
      <LogOutButton/>
      <UserName/>
      <SearchBar/>
      <ContactsTable/>
    </div>
    )
}
// prefer elements without parenthesis like handlelclose functions
// will turn modal into a function