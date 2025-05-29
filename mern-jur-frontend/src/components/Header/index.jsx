import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export const Header = () => {
  const token = localStorage.getItem("token")
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const onClickLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  useEffect(() => {
    if (token) {
      setIsAuth(true)
    }
  }, [setIsAuth])
  
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>Адвокатская фирма</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to={"/posts/create"}>
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to={"/jurs"}>
                  <Button variant="contained">Выбрать адвоката</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to={"/registration"}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
