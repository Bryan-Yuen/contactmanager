import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AddContact from './AddContact'
import Contact from './Contact'
import {useSelector, useDispatch} from 'react-redux'
import { updateContacts } from "../../features/contactsSlice"
import { updateSearchResults } from '../../features/searchResultsSlice'

export default function ContactsTable() {
  const dispatch = useDispatch();

  const searchResults = useSelector((state) => state.searchResults.value)

  useEffect(() => {
    getContacts()
    //console.log(contactsArray)
    console.log("im being called")
  }, [])

  function getContacts()
  {
    axios.get('/contacts/getContacts')
    .then((response) => {
      console.log(response.data);
      dispatch(updateContacts(response.data))
      dispatch(updateSearchResults(response.data))
    })
    .catch((error) => {
      console.log(error);
      console.log("error here")
    });
  }

  return (
    <div>
       <table class="table table-bordered align-middle">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th colspan="2"><AddContact/></th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(contact =>
      <Contact contactId={contact._id} contactName={contact.contactName} contactPhoneNumber={contact.contactPhoneNumber} 
      contactEmail={contact.contactEmail} getContacts={getContacts}/>
          )
          }
        </tbody>
      </table>
    </div>
  )
}
