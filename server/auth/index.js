const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const mongodb = require('../model/authModel')
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    async function verify(username, password, done) {

      const user = await mongodb.findOne({username: username})

      if (!user) {
        console.log("Usuário não encontrado");
        return done(null, false, { message: 'Senha ou nome de usuário incorreto' });
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          console.log("Usuário encontrado")
          return done(null, user)
        } else {
          console.log("Senha incorreta")
          return done(null, false, {message: "Senha incorreta"})
        }
      } catch (error) {
        console.log("Erro ao validar usuário")
        return done(error)
      }
}));

passport.serializeUser((user, done) => {
  process.nextTick(function() {
    done(null, {id: user._id, username: user.username})
  })
})

passport.deserializeUser((user, done) => {
  process.nextTick(function () {
    return done(null, user)
  })
})

module.exports = passport