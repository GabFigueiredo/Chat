import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import axios from 'axios';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
  };
}

export default function Contacts({ userLogged, setIOSession }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getUsers', {
          withCredentials: true,
        });
        setContacts(response.data.data);
      } catch (error) {
        console.log('Erro ao buscar contatos', error);
      }
    };
    getContacts();
  }, []);

  async function createIOSession(targetUser) {
    try {
      const response = await axios.post(
        'http://localhost:5000/chatRoom',
        { currentUser: userLogged.username, targetUser: targetUser.username },
        { withCredentials: true }
      );
      setIOSession(response.data.roomID);
      setSelectedContact(targetUser.username);
    } catch (error) {
      console.log('Erro ao criar socket', error);
    }
  }

  return (
    <div style={styles.contactsContainer}>
      <ul style={styles.contactList}>
        {contacts.map((contact, i) => (
          <li
            key={i}
            style={{
              ...styles.contactItem,
              ...(selectedContact === contact.username && styles.contactItemSelected) // Aplica estilo condicional
            }}
            onClick={() => createIOSession(contact)}
          >
            <Avatar {...stringAvatar(contact.username)} />
            <p style={styles.contactName}>{contact.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  contactsContainer: {
    padding: '20px',
    color: 'white',
    backgroundColor: '#2c2c2c',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
    overflow: 'scroll'
  },
  contactList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  contactItemHover: {
    backgroundColor: '#1e1e1e',
  },
  contactName: {
    margin: 0,
    fontSize: '1em',
    color: '#ffffff',
  },
  
  contactItemSelected: {
    backgroundColor: '#1e1e1e',
    border: '2px solid transparent', // Mantém a borda transparente para o efeito de degradê
    backgroundImage: 'linear-gradient(#1e1e1e, #1e1e1e), linear-gradient(45deg, #0093A6, #3E2A7B)', // Duplo degradê
    backgroundOrigin: 'border-box',  // Define a origem do background no limite da borda
    backgroundClip: 'padding-box, border-box', // Define o clipe para o preenchimento e borda
    transform: 'scale(1.05)', // Mantém a animação de aumento
  },
};