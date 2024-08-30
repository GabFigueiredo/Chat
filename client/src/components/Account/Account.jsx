import React, { useEffect } from 'react';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function Account({ userLogged }) {
  let navigate = useNavigate();

  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, [userLogged, navigate]);

  return (
    <div style={styles.accountContainer}>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>
        {userLogged ? userLogged.username[0].toUpperCase() : ''}
      </Avatar>
      <h3 style={styles.username}>{userLogged.username}</h3>
    </div>
  );
}

const styles = {
  accountContainer: {
    display: 'flex',
    padding: '20px',
    color: 'white',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: '#343434',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  username: {
    margin: 0,
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
};
