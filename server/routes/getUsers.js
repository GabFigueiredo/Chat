const express = require('express')
const router = express.Router()
const getUsers = require('../controllers/getUsers')

router.get('/getUsers', getUsers)

module.exports = router