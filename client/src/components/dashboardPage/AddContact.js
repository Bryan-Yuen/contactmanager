import React, {useState} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useSelector, useDispatch} from 'react-redux'
import { updateContacts } from "../../features/contactsSlice"
import { updateSearchResults } from '../../features/searchResultsSlice'

export default function AddContact() {
  const [addContactName, setAddContactName] = useState()
  const [addContactPhoneNumber, setAddContactPhoneNumber] = useState()
  const [addContactEmail, setAddContactEmail] = useState()

  const [showAddContact, setShowAddContact] = useState(false);

  const handleCloseAddContact = () => setShowAddContact(false);
  const handleShowAddContact = () => setShowAddContact(true);

  const dispatch = useDispatch();

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

  function addContact()
  {
    axios.post('/contacts/addContact', {
      contactName: addContactName,
      contactPhoneNumber: addContactPhoneNumber,
      contactEmail: addContactEmail
    })
    .then((response) => {
      console.log(response.data);
      handleCloseAddContact();
      getContacts();

    })
    .catch((error) => {
      console.log(error);
      console.log("error here")
    });
  }

  return (
  <div>
      <Modal show={showAddContact} onHide={handleCloseAddContact}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Add Contact</label>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" placeholder="Name" onChange={e => setAddContactName(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Phone Number</label>
              <input type="text" class="form-control" placeholder="Phone Number" onChange={e => setAddContactPhoneNumber(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="text" class="form-control" placeholder="Email" onChange={e => setAddContactEmail(e.target.value)}></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddContact}>
            Close
          </Button>
          <Button variant="primary" onClick={() => addContact()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="center-button">
        <btn type="button" class="btn btn-primary" onClick={handleShowAddContact}>Add Contact</btn>
      </div>
  </div>
  )
}
