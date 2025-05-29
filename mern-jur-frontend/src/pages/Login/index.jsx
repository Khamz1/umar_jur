import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { login, register } from "../services/routes";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const { isAuth, setIsAuth } = useContext(AuthContext)

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await login(data)
      localStorage.setItem("token", res.data.token)

      if (res.data.token) {
        setIsAuth(true)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <TextField
        className={styles.field}
        label="E-Mail"
        error
        helperText="Неверно указана почта"
        fullWidth
        name="email"
        onChange={handleChange}
      />
      <TextField className={styles.field} label="Пароль" fullWidth name="password" onChange={handleChange} />
      <Button size="large" variant="contained" fullWidth onClick={handleLogin}>
        Войти
      </Button>
    </Paper>
  );
};
