const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true,
  },
  contactPhoneNumber: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  }
})

// there will be an s or contacts in database don't be scared mongoose does that
module.exports = mongoose.model("Contact", contactSchema)