import React, {useState} from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function EditContact(props) {
  const [editContactName, setEditContactName] = useState()
  const [editContactPhoneNumber, setEditContactPhoneNumber] = useState()
  const [editContactEmail, setEditContactEmail] = useState()
  const [contactId, setContactId] = useState()

  const [showEditContact, setShowEditContact] = useState(false);

  const handleCloseEditContact = () => setShowEditContact(false);
  const handleShowEditContact = (contact_id, contactName, contactPhoneNumber, contactEmail) => {
    setContactId(contact_id);
    setEditContactName(contactName)
    setEditContactPhoneNumber(contactPhoneNumber)
    setEditContactEmail(contactEmail)
    setShowEditContact(true);
    console.log("contactid" + contact_id)
    console.log("contactName" + contactName)
  }

  function editContact()
  {
    console.log("im in edit contact and id is" + contactId)
    axios.put('/contacts/editContact/' + contactId, {
      contactName: editContactName,
      contactPhoneNumber: editContactPhoneNumber,
      contactEmail: editContactEmail,
      //contactId: contactId
    })
    .then((response) => {
      console.log(response.data);
      handleCloseEditContact();
      props.getContacts()
    })
    .catch((error) => {
      console.log(error);
      console.log("error here")
    });
  }

  return (
    <td>
          <Modal show={showEditContact} onHide={handleCloseEditContact}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>Edit</label>
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" value={editContactName} class="form-control" placeholder="Name" onChange={e => setEditContactName(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Phone Number</label>
              <input type="text" value={editContactPhoneNumber} class="form-control" placeholder="Phone Number" onChange={e => setEditContactPhoneNumber(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="text" value={editContactEmail} class="form-control" placeholder="Email" onChange={e => setEditContactEmail(e.target.value)}></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditContact}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editContact()}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
      <div class="center-button">
        <btn type="button" class="btn btn-primary" onClick={() => handleShowEditContact(props.contactId, props.contactName,
        props.contactPhoneNumber, props.contactEmail)}>
          Edit Contact
        </btn>
      </div>
    </td>
  );
}
