const socketio = require('socket.io');
const colors = require('../colors')

function initializeSocket(server) {
  const io = socketio(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST']
    }
  });

  // Lida com novas conexões de clientes
  io.on('connection', (socket) => {
    console.log(`${colors.blue}Um usuário se conectou: ${colors.end}`, socket.id);

    // Evento para o cliente entrar em uma sala específica
    socket.on('joinRoom', (sessionId) => {
      socket.join(sessionId); 
      console.log(`Usuário entrou na sala: ${sessionId}`);
    });


    socket.on('sendMessage', (data) => {
      const { IOSession, sender, content, data: messageDate } = data;
        
      console.log(`Mensagem recebida de ${sender}:`, content);

      // Emite a mensagem para todos os clientes na mesma sala
      io.to(IOSession).emit('message', {
        sender: sender, // Define o remetente como 'other' para mensagens recebidas pelo frontend
        content: content,
        timestamp: messageDate,
      });
    });

    // Evento disparado quando um cliente se desconecta
    socket.on('disconnect', () => {
      console.log(`${colors.red}Um usuário se desconectou:${colors.end}`, socket.id);
    });
  });

  return io; // Retorna a instância do servidor Socket.IO para uso posterior
}

module.exports = initializeSocket;