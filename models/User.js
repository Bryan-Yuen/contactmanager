const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
// Mongoose#model(name, [schema], [collection], [skipInit])
// maybe put the function parameters in a cheat sheet somewhere
module.exports = mongoose.model("User", userSchema)