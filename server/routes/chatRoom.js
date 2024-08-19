const express = require('express')
const router = express.Router()
const room = require('../controllers/room')

router.post('/chatRoom', room)

module.exports = router