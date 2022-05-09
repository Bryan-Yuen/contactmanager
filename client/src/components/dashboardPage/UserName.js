import {useState, useEffect} from 'react'
import axios from 'axios';

export default function UserName() {
  const [name, setName] = useState("")

  function getName()
  {
    axios.get('/users/getName')
    .then((response) => {
      console.log("im in getName")
      console.log(response.data)
      setName(response.data)
    })
    .catch((error) => {
      console.log(error);
      console.log("error here")
    });
  }

  useEffect(() => {
    getName()
    //console.log(contactsArray)
    console.log("im being called")
  }, [])

  return (
    <h1 class="name-header">Welcome {name}</h1>
  )
}
