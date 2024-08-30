const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const mongodb = require('../model/authModel')
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    async function verify(username, password, done) {

      const user = await mongodb.findOne({username: username})

      if (!username || !password) {
        return done(null, false, { message: 'Não pode fazer o request pois está faltando informações' });
      }

      if (!user) {
        return done(null, false, { message: 'Senha ou nome de usuário incorreto' });
      }

      try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, {message: "Senha incorreta"})
        }
      } catch (error) {
        return done(error)
      }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  try {
    const user = await mongodb.findById(id);
    done(null, user)
  } catch (err) {
    done(err, null)
  }
}) 
module.exports = passport