// Dotenv variaables
require('dotenv').config()
const PORT = process.env.PORT || 5000
const CONNECTION_URI = process.env.CONNECTION_URI
const NODE_ENV = process.env.NODE_ENV

const app = require('./server')
const http = require('http');
const mongoose = require('mongoose')
const colors = require('./colors.js')

const server = http.createServer(app)

const initializeSocket = require('./socket/socketConfig');
initializeSocket(server);

// Connection
function connectToDatabase() {
    mongoose.connect(CONNECTION_URI).then(() => {
        if (NODE_ENV === 'production') {
            console.log(colors.green + "Conectado ao banco de dados" + colors.end)
        }
    })
}

if (NODE_ENV === 'production') {
    connectToDatabase()
    server.listen(PORT, () => {
        console.log(colors.green + 'Server está ligado na porta 5000' + colors.end)
    })
}

module.exports = {app, connectToDatabase}