import {React, useState} from "react";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import axios from "axios";
import { useSnackbar } from 'notistack';
import {useNavigate} from 'react-router-dom'
import styles from './login.module.css'

const inputTextStyle = {
    backgroundColor: '#373737',
    '.css-e4w4as-MuiFormLabel-root-MuiInputLabel-root': {
        color: 'white'
    },
    '.css-o943dk-MuiFormLabel-root-MuiInputLabel-root': {
        color: '#3CB8FF'
    },

    '.css-10botns-MuiInputBase-input-MuiFilledInput-input': {
        color: 'white'
    }
    
}
export default function Login({setUserLogged}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate()

    async function userLogIn() {

        if (!username || !password) {
            enqueueSnackbar("Complete todos os campos", {variant: 'warning'})
            return
        }
        
        const verifyUser = {
            username: username,
            password: password,
        }

        try {
            const response = await axios.post('http://localhost:5000/login/password', verifyUser, {withCredentials: true});
            if (response.data.user) {
                setUserLogged(response.data.user)
                enqueueSnackbar("Log in feito com sucesso", {variant: 'success'})
                navigate("/app")
            } else if (response.status !== 200) {
                enqueueSnackbar(response.data.message, { variant:'error' });
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant:'error' });
        }
    }
    
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{color: 'white', display: 'flex', flexDirection: 'column', gap: '10px', width: 'fit-content', height: 'fit-content'}}>
                <h1>Log in</h1>
                <TextField id="filled-basic"
                    label="Username" variant="filled"
                    sx={inputTextStyle}
                    value= {username}
                    onChange={(event) => setUsername(event.target.value)} 
                    />
                <TextField id="filled-basic"
                    label="Password" variant="filled"
                    sx={inputTextStyle} 
                    onChange={(event) => setPassword(event.target.value)}
                    />
                <Button onClick={() => userLogIn()}
                variant="outlined">Log</Button>
                <p>Quer criar uma conta? <span className={styles.span} onClick={() => navigate('/register')}>Clique aqui</span></p>
            </div>
        </div>
    )
}