const io = require("socket.io")(5000, {
    cors: {
        origin: ["http://localhost:3000"],
    }
})

io.on('connection', (socket) => {
    console.log("Um usuário se conectou")

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId)
        console.log(`Usuário entrou na sala ${roomId}`)
    })
})

module.exports = io