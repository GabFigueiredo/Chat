import {React, useState} from "react";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import axios from "axios";
import { useSnackbar } from 'notistack';
import {useNavigate} from 'react-router-dom'
import styles from '../Login/login.module.css'


const inputTextStyle = {
    backgroundColor: '#373737',
    '.css-e4w4as-MuiFormLabel-root-MuiInputLabel-root': {
        color: 'white'
    }
    
}
export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    
    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate()

    async function userLogIn() {
        
        const verifyUser = {
            username: username,
            password: password,
            email: email
        }

        try {
            const response = await axios.post('http://localhost:5000/register', verifyUser);

            if (response.data.success) {
                navigate("/")
            } else {
                enqueueSnackbar('Erro ao criar usuário', { variant:'error' });
                setUsername('')
                setPassword('')
            }
        } catch (error) {
            enqueueSnackbar('Erro ao fazer a requisição', { variant: 'error' });
            setUsername('')
            setPassword('')
            console.log("Erro ao tentar criar usuário pelo servidor", error)
        }
    }
    
    return (
        <div style={{color: 'white', display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <h1>Register</h1>
            <TextField id="filled-basic"
                label="Username" variant="filled"
                sx={inputTextStyle}
                onChange={(event) => setUsername(event.target.value)} 
            />
            <TextField id="filled-basic"
                label="Email" variant="filled"
                sx={inputTextStyle}
                onChange={(event) => setEmail(event.target.value)} 
            />
            <TextField id="filled-basic"
                label="Password" variant="filled"
                sx={inputTextStyle} 
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={() => userLogIn()}
            variant="outlined">Register</Button>
            <p>Voltar ao <span className={styles.span} onClick={() => navigate('/')}>Login</span></p>
        </div>
    )
}