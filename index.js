// import libraries
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path')
require('dotenv').config();
const usersRoutes = require('./routes/usersRoutes')
const contactsRoutes = require('./routes/contactsRoutes')

// instantiate app object from express

const app = express()

mongoose.connect(process.env.DATABASE_URL , () => {
  console.log("Connected")
});

// you will get an TypeError cannot read properties of undefined of like a req.body.email
// if you don't put this
app.use(express.static(path.join(__dirname, "client/build")));

app.use(express.json());
//
app.use(session({
  secret: process.env.COOKIE_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  resave: false,
  saveUninitialized: false,
}))

app.use('/users', usersRoutes)
app.use('/contacts', contactsRoutes)

app.get('/', (req, res) => {
  res.send("hello world")
})


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});


app.listen(process.env.PORT || 5000, () => {
  console.log("server started on port 5000");
});