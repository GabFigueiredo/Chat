const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String
})

const authModel = mongoose.model("Users", userSchema, "Users")

module.exports = authModel