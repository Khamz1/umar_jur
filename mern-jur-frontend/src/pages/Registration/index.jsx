import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { register } from '../services/routes';

export const Registration = () => {

  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegistration = () => {
    register(data)
  }  

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField className={styles.field} name='fullName' label="Полное имя" fullWidth onChange={handleChange} value={data.fullname} />
      <TextField className={styles.field} name='email' label="E-Mail" fullWidth onChange={handleChange} value={data.email} />
      <TextField className={styles.field} name='password' label="Пароль" fullWidth onChange={handleChange} value={data.password} />
      <Button size="large" variant="contained" fullWidth onClick={handleRegistration}>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
