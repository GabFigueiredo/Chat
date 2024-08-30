import './App.css';
import Contacts from './components/Contacts/Contacts'
import Account from './components/Account/Account'
import Chat from './components/Chat/Chat'
import Login from './components/Login/login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {React, useState} from 'react'

import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {
  const [userLogged, setUserLogged] = useState('')
  const [IOSession, setIOSession] = useState('')

  const {enqueueSnackbar} = useSnackbar()

  return (
    <SnackbarProvider maxSnack={3}>
    <Router>
    <Routes>
      <Route path="" element={
        <Login setUserLogged={setUserLogged}/>
      }/>
      <Route path="/app" element={
        <div className='App'>
            <aside>
              <Account userLogged={userLogged}/>
              <Contacts userLogged={userLogged} setIOSession={setIOSession}/>
            </aside>
            <main>
              <Chat IOSession={IOSession} userLogged={userLogged}/>
            </main>
          </div>
        } />
      <Route path="/register" element={<Register/>} />
      </Routes>
        </Router>
    </SnackbarProvider>
    )
}

export default App;
