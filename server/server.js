const express = require('express')
const app = express()
const path = require("path")
const passport = require('passport')
const session = require("express-session")
const loginRouter = require("./routes/auth.js")
const chatRoomRouter = require("./routes/chatRoom.js")
const getUsersRouter = require("./routes/getUsers.js")
const middlewares = require('./middlewares/middlewares.js')
const MongoStore = require('connect-mongo')

require('dotenv').config()
const CONNECTION_URI = process.env.CONNECTION_URI

middlewares.forEach(middleware => app.use(middleware))

// Setting views
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Passport session things
app.use(session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: CONNECTION_URI, collectionName: "sessions"}),
    cookie: {
        maxAge: 1000*60*60*24,
    }
}));

require('./auth/index.js')

app.use(passport.initialize())
app.use(passport.session())


// Using Routes
app.use('/', loginRouter)
app.use('/', chatRoomRouter)
app.use('/', getUsersRouter)


module.exports = app
