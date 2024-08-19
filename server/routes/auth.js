const express = require('express')
const router = express.Router()
const passport = require('../auth/index')
const register = require('../controllers/register')

// Login page
router.get('/login', (req, res) => {
  res.render('login')
})

// Register page
router.post('/register', register)

// Where the authentication happens
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/sucesso',
    failureRedirect: '/falha'
  }))

module.exports = router