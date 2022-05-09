import React from 'react';
import axios from 'axios';

export default function DeleteContact(props) {
  function deleteContact(contactId)
  {
    console.log("im in delete contact and id is" + contactId)
    axios.delete('/contacts/deleteContact/' + contactId)
    .then((response) => {
      console.log(response.data);
      console.log("hiii" + props.getContacts)
      props.getContacts()
    })
    .catch((error) => {
      console.log(error);
      console.log("error here")
    });
  }

  return (
    <td>
      <div class="center-button">
        <btn type="button" class="btn btn-primary" onClick={() => deleteContact(props.contactId)}>Delete Contact</btn>
      </div>
    </td>
  );
}

