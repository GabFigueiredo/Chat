const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    _id: String,
    participants: Array,
    messages: Array,
    createdAt: String,
    updatedAt: String
})

const messagesModel = mongoose.model("ChatRooms", messageSchema, "ChatRooms")

module.exports = messagesModel