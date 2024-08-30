const express = require('express')
const router = express.Router()
const passport = require('../auth/index')
const register = require('../controllers/register')

router.get('/verifyLog', (req, res) => {
  if (req.isAuthenticated()) {
    res.send({success: true})
  } else {
    res.status(401).send({success: false})
  }
})

router.get('/logout', (req, res) => {
  if(req.isAuthenticated()) {
    req.logout(() => {
      console.log("Deslogado")
    })
  } else {
      res.redirect('/login')
  }
})

// Register page
router.post('/register', register)
// Where the authentication happens

router.post('/login/password', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao logar o usuário" });
      }
      return res.status(200).json({ message: "Login bem-sucedido", user });
    });
  })(req, res, next);
});

module.exports = router

