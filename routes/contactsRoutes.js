const express = require('express')
const Contact = require('../models/Contact')

const router = express.Router()

router.post('/addContact', async (req, res) => {
  const contact = new Contact({
    contactName: req.body.contactName,
    contactEmail: req.body.contactEmail,
    contactPhoneNumber: req.body.contactPhoneNumber,
    userId: req.session.userId
  })
  try {
    await contact.save()
    res.status(201).json({message: "Contact added"})
  } catch (error) {
    res.status(400).json({message : error.message})
  }
})

// if you put a property that doesn't exist or you misspell it, it returns everything
router.get('/getContacts', async (req, res) => {
  try {
    const contacts = await Contact.find({userId: req.session.userId})
    res.send(contacts)
  } catch (error) {
    res.status(400).json({message : error.message})
  }
})

router.put('/editContact/:contactId', async (req, res) => {
  try {
    await Contact.updateOne({_id: req.params.contactId}, {
      contactName: req.body.contactName,
      contactEmail: req.body.contactEmail,
      contactPhoneNumber: req.body.contactPhoneNumber
    })
    
    res.status(200).json( {message: "Contact Updated!"})
  } catch (error) {
    res.status(400).json({message : error.message})
  }
})

router.delete('/deleteContact/:contactId', async (req, res) => {
  try {
    await Contact.deleteOne({_id: req.params.contactId})
    res.status(200).json( {message: "Contact Deleted!"})
  } catch (error) {
    res.status(400).json({message : error.message})
  }
})

module.exports = router