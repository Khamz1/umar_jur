import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { createPost } from '../services/routes';
import { jwtDecode } from '../../helpers/jwtDecode';

export const AddPost = () => {
  const imageUrl = '';
  const [value, setValue] = React.useState('');

  const handleChangeFile = () => { };

  const onClickRemoveImage = () => { };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const [data, setData] = useState({
    title: '',
    text: '',
    imageUrl: '',
    tags: '',
    userId: '',
  });

  const handleCreatePost = () => {
    console.log(data)
    createPost(data);

  }

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setData(prev => ({ ...prev, userId: jwtDecode(localStorage.getItem("token"))._id }))
    }
  }, [setData])

  console.log(data);
  

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
         Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        name="title"
        onChange={handleChange}
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth name="tags" onChange={handleChange} />
      <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} onInput={(e) => setData(prev => ({ ...prev, text: e.target.value }))} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={handleCreatePost}>
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
