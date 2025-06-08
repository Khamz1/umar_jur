  import React, { useState, useCallback, useMemo, useEffect } from 'react';
  import TextField from '@mui/material/TextField';
  import Paper from '@mui/material/Paper';
  import Button from '@mui/material/Button';
  import SimpleMDE from 'react-simplemde-editor';
  import 'easymde/dist/easymde.min.css';
  import styles from './AddPost.module.scss';
  import { useNavigate } from 'react-router-dom';
  import { jwtDecode } from '../../helpers/jwtDecode';

  export const AddPost = () => {
    const [value, setValue] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    const [data, setData] = useState({
      title: '',
      text: '',
      tags: '',
      userId: '',
    });

    const handleChangeFile = async (e) => {
      try {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error('Ошибка загрузки изображения:', err);
      }
    };

    const onClickRemoveImage = () => {
      setImageUrl('');
    };

    const onChange = useCallback((value) => {
      setValue(value);
    }, []);

    const options = useMemo(
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
      []
    );

    const handleCreatePost = () => {
      // Получаем текущие посты из localStorage
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');

      // Создаём новый пост
      const newPost = {
        _id: Date.now().toString(),
        title: data.title,
        text: value,
        imageUrl: imageUrl,
        tags: data.tags.split(','),
        user: {
          _id: data.userId,
          fullName: 'User',
        },
        createdAt: new Date().toISOString(),
        viewsCount: 0,
      };

      // Добавляем новый пост и сохраняем
      const updatedPosts = [newPost, ...posts];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));

      // Перенаправляем на страницу поста
      navigate(`/posts/${newPost._id}`);
    };

    const handleChange = (e) => {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
      if (localStorage.getItem('token')) {
        const decoded = jwtDecode(localStorage.getItem('token'));
        setData((prev) => ({ ...prev, userId: decoded._id }));
      }
    }, []);

    return (
      <Paper style={{ padding: 30 }}>
        <Button 
          variant="outlined" 
          size="large" 
          component="label"
        >
          Загрузить превью
          <input 
            type="file" 
            onChange={handleChangeFile} 
            hidden 
            accept="image/*" 
          />
        </Button>
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <img 
              className={styles.image} 
              src={imageUrl} 
              alt="Uploaded" 
              style={{ maxWidth: '100%', marginTop: 10 }} 
            />
          </>
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
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Тэги"
          fullWidth
          name="tags"
          onChange={handleChange}
        />
        <SimpleMDE
          className={styles.editor}
          value={value}
          onChange={onChange}
          options={options}
        />
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