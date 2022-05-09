import React from 'react'
import EditContact from './EditContact'
import DeleteContact from './DeleteContact'

export default function Contact(props) {
  return (
      <tr>
        <td>{props.contactName}</td>
        <td>{props.contactPhoneNumber}</td>
        <td>{props.contactEmail}</td>
        <EditContact contactId={props.contactId} contactName={props.contactName} contactPhoneNumber={props.contactPhoneNumber} 
        contactEmail={props.contactEmail} getContacts={props.getContacts} />
        <DeleteContact contactId={props.contactId} getContacts={props.getContacts}/>
      </tr>
  )
}
