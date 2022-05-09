const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const exist = await User.exists({ email: req.body.email})
    if (exist)
      throw {message: "Email already exist."}

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword
    })
    await user.save()
    res.status(201).json({message: "User Added!"})
  } catch (error) {
    console.log(error.message)
    res.status(400).json({message : error.message})
  }

})

router.post('/login', async (req, res) =>{
  try {
    // findone returns a single document
    const user = await User.findOne({
      email: req.body.email
    })

    if (user == null)
      throw {message: "User does not exist."}

    const match = await bcrypt.compare(req.body.password, user.password)
    if (match)
    {
      req.session.userId = user._id
      res.status(200).json({message: "Successful Log in!"})
    }
    else
      throw {message: "Incorrect username and password combination."}
  } catch (error) {
    res.status(401).json({message : error.message})
  }
})

router.get('/getName', async (req, res) => {
  try {
    const user = await User.findOne({_id: req.session.userId})
    res.send(user.name)
  } catch (error) {
    res.status(400).json({message : error.message})
  }
})

router.get('/logOut', (req, res) => {
  req.session.destroy()
  res.send("Logged out!")
})

router.get('/checkCookie', (req, res) => {
  if(req.session.userId)
    res.status(200).json({message: "User Logged in"})
  else
    res.status(401).json({message : "Not Logged in"})
})

module.exports = router