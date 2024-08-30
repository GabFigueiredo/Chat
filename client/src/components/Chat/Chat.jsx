import {React, useState, useEffect} from "react";
import axios from "axios";
import './Chat.css'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import io from 'socket.io-client';
import { useSnackbar } from 'notistack';

const textStyle = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white', // cor da borda padrão
        },
        '&:hover fieldset': {
            borderColor: 'white', // cor da borda quando em hover
        },

        '&.Mui-focused fieldset': {
            borderColor: '#56cef6', // cor da borda quando focado
        },
    },
    '& .MuiInputBase-input': {
        color: 'white', // cor do texto digitado
    },
    '& .MuiInputLabel-root': {
        color: 'white', // cor do label padrão
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#56cef6', // cor do label quando focado
    },
};

export default function Chat({IOSession, userLogged}) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const [socket, setSocket] = useState(null)

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {

        const socket = io("http://localhost:5000", {
            query: { IOSession } // Passa o ID da sessão como uma query parameter
          });

        setSocket(socket);

        // 2. Escuta o evento de 'connect' para garantir que o socket conectou com sucesso
        socket.on('connect', () => {
            console.log('Conectado ao servidor WebSocket');
          });

        // 3. Escuta o evento 'message' para receber mensagens do servidor
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]); // Adiciona a nova mensagem ao array de mensagens
        });

        socket.emit('joinRoom', IOSession);

        if (IOSession) {
            const encodedId = encodeURIComponent(IOSession);
    
            async function getMessages() {
                try {
                    const response = await axios.get(`http://localhost:5000/getMessages/${encodedId}`, {withCredentials: true})
                    console.log(response)
                    setMessages(response.data.messages)
                } catch (error) {
                    console.log(error)
                }
            }
            getMessages()
        }

        return () => {
            socket.disconnect(); // Desconecta o socket
            console.log('Desconectado do servidor WebSocket');
        };
    }, [IOSession])
    
    async function sendMessage() {
        const sendNewMessage = {
            IOSession,
            sender: userLogged.username,
            content: newMessage,
            data: new Date().toISOString()
        }
        if (newMessage.trim() && socket) {
            socket.emit('sendMessage', sendNewMessage)

            try {
                await axios.post('http://localhost:5000/sendMessage', sendNewMessage)
            } catch (error) {
                enqueueSnackbar("Erro ao enviar mensagem", {variant: 'error'})
            }
        }
        setNewMessage('')
    }

    if (IOSession) {
        return (
            <>
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <div
                    key={index}
                    className={`message ${msg.sender === userLogged.username ? 'right' : 'left'}`}
                    >
                    <div className="message-content">
                        <p>{msg.content}</p>
                        <span className="message-time">{new Date(msg.data).toLocaleTimeString()}</span>
                    </div>
                    </div>
                ))}
            </div>
            <div className="inputContainer">
                <Box    
                    sx={{
                        width: 750,
                        maxWidth: '100%',
                        height: 'fit-content'
                    }}
                    >
                    <TextField fullWidth
                    sx = { textStyle }
                    onChange={(event) => setNewMessage(event.target.value)}
                    color='primary' label="Mensagem" id="fullWidth" />
                </Box>
                <IconButton onClick={() => sendMessage()}>
                    <SendIcon sx={{color: '#0093A6'}}/>
                </IconButton>
            </div>
            </>
        )
    } else {
        return (
            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'center'}}>
                <MessageIcon style={{alignSelf: 'center'}} sx={{fontSize:400, color: "#1e1e1e"}}></MessageIcon>
            </div>
        )
    }
}