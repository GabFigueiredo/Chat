const express = require('express')
const router = express.Router()
const room = require('../controllers/room')
const getMessages = require('../controllers/getMessages')
const sendMessage = require('../controllers/sendMessage')

router.post('/chatRoom', room)

router.get('/getMessages/:id', getMessages)

router.post('/sendMessage', sendMessage)

module.exports = router